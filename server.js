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
let localDbProperties = [];
if (fs.existsSync(DB_FILE)) {
  try { localDbProperties = JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); } catch (e) { localDbProperties = []; }
}

function saveLocalDb() {
  fs.writeFileSync(DB_FILE, JSON.stringify(localDbProperties, null, 2));
}

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];

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
