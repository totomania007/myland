const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const DB_FILE = path.join(__dirname, 'db_properties.json');
const LESSORS_DB_FILE = path.join(__dirname, 'db_lessors.json');

const DEFAULT_PROPERTY = {
  id: 'prop-1',
  name: 'แอสเพน คอนโด ลาซาล (Aspen Condo)',
  houseNo: '101/12',
  address: 'ถนนลาซาล แขวงบางนาใต้ เขตบางนา กรุงเทพมหานคร 10260',
  lessorKey: 'husband',
  principal: 3500000,
  installment: 17500,
  rent: 12000,
  deposit: 24000,
  startDate: '2024-01-01',
  rate: 3.5,
  type: 'คอนโดมีเนียม',
  size: '35 ตร.ม.',
  meterElec: '12345',
  meterWater: '67890',
  inventoryList: [
    { name: 'เครื่องปรับอากาศ (Air Conditioner)', img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250' fill='%23e2ded8'><rect width='400' height='250'/></svg>" },
    { name: 'เตียงนอน 6 ฟุต พร้อมฟูก (6ft Bed & Mattress)', img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250' fill='%23e2ded8'><rect width='400' height='250'/></svg>" },
    { name: 'ตู้เสื้อผ้า Built-in (Built-in Wardrobe)', img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250' fill='%23e2ded8'><rect width='400' height='250'/></svg>" }
  ],
  rateSchedule: [
    { startMonth: 1, endMonth: 36, rate: 3.5, label: 'โปรโมชั่น Retention ปีที่ 1-3' },
    { startMonth: 37, endMonth: 360, rate: 5.5, label: 'อัตราดอกเบี้ยลอยตัว (MRR)' }
  ]
};

const DEFAULT_LESSOR = {
  id: 'husband',
  name: 'นายสมคิด สุขสมบัติ',
  idCard: '1-1004-00123-45-6',
  age: 45,
  phone: '089-123-4567',
  address: '123/45 ถนนสุขุมวิท 101 แขวงบางนา เขตบางนา กรุงเทพมหานคร',
  imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250' fill='%23e2ded8'><rect width='400' height='250'/></svg>"
};

let localDbProperties = [DEFAULT_PROPERTY];
if (fs.existsSync(DB_FILE)) {
  try {
    const parsed = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    if (Array.isArray(parsed) && parsed.length > 0) localDbProperties = parsed;
  } catch (e) {}
}

let localDbLessors = [DEFAULT_LESSOR];
if (fs.existsSync(LESSORS_DB_FILE)) {
  try {
    const parsedL = JSON.parse(fs.readFileSync(LESSORS_DB_FILE, 'utf8'));
    if (Array.isArray(parsedL) && parsedL.length > 0) localDbLessors = parsedL;
  } catch (e) {}
}

function saveLocalDb() {
  fs.writeFileSync(DB_FILE, JSON.stringify(localDbProperties, null, 2));
}

function saveLessorsDb() {
  fs.writeFileSync(LESSORS_DB_FILE, JSON.stringify(localDbLessors, null, 2));
}

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];

  if (reqUrl === '/api/lessors') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify(localDbLessors));
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        if (req.method === 'POST') {
          const id = data.id || `lessor-${Date.now()}`;
          const newLessor = { ...data, id };
          const idx = localDbLessors.findIndex(l => l.id === id);
          if (idx !== -1) localDbLessors[idx] = newLessor;
          else localDbLessors.unshift(newLessor);
          saveLessorsDb();
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, id }));
        } else if (req.method === 'DELETE') {
          localDbLessors = localDbLessors.filter(l => l.id !== data.id);
          saveLessorsDb();
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, id: data.id }));
        }
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (reqUrl === '/api/properties') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify(localDbProperties));
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        if (req.method === 'POST') {
          const newProp = { ...data, id: data.id || `prop-${Date.now()}` };
          localDbProperties.unshift(newProp);
          saveLocalDb();
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, id: newProp.id }));
        } else if (req.method === 'PUT') {
          const idx = localDbProperties.findIndex(p => p.id === data.id);
          if (idx !== -1) {
            localDbProperties[idx] = { ...localDbProperties[idx], ...data };
          } else {
            localDbProperties.unshift(data);
          }
          saveLocalDb();
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, id: data.id }));
        } else if (req.method === 'DELETE') {
          localDbProperties = localDbProperties.filter(p => p.id !== data.id);
          saveLocalDb();
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, id: data.id }));
        } else {
          res.writeHead(405);
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        }
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (reqUrl === '/') reqUrl = '/demo_preview.html';

  const filePath = path.join(__dirname, reqUrl);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'text/plain; charset=utf-8';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (reqUrl.startsWith('/js/')) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 JS File Not Found');
        return;
      }
      fs.readFile(path.join(__dirname, 'demo_preview.html'), (err2, data2) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data2);
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Rental Property Management Web App running live at http://localhost:${PORT}`);
});
