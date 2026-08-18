async function ensurePropertiesTable(env) {
  if (!env || !env.DB) return;
  try {
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS properties (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        lessor_key TEXT NOT NULL DEFAULT 'husband',
        type TEXT DEFAULT 'อสังหาฯ เช่า',
        address TEXT,
        house_no TEXT NOT NULL DEFAULT '',
        size TEXT,
        rent INTEGER DEFAULT 0,
        deposit INTEGER DEFAULT 0,
        principal INTEGER DEFAULT 0,
        installment INTEGER DEFAULT 0,
        rate REAL DEFAULT 4.5,
        start_date TEXT,
        meter_elec TEXT,
        meter_water TEXT,
        inventory_json TEXT,
        rate_schedule_json TEXT,
        gallery_json TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `).run();
  } catch(e) {}

  const migrations = [
    "ALTER TABLE properties ADD COLUMN gallery_json TEXT",
    "ALTER TABLE properties ADD COLUMN rate_schedule_json TEXT",
    "ALTER TABLE properties ADD COLUMN inventory_json TEXT",
    "ALTER TABLE properties ADD COLUMN meter_elec TEXT",
    "ALTER TABLE properties ADD COLUMN meter_water TEXT",
    "ALTER TABLE properties ADD COLUMN start_date TEXT",
    "ALTER TABLE properties ADD COLUMN principal INTEGER DEFAULT 0",
    "ALTER TABLE properties ADD COLUMN installment INTEGER DEFAULT 0",
    "ALTER TABLE properties ADD COLUMN rate REAL DEFAULT 4.5",
    "ALTER TABLE properties ADD COLUMN lessor_key TEXT DEFAULT 'husband'",
    "ALTER TABLE properties ADD COLUMN type TEXT DEFAULT 'อสังหาฯ เช่า'",
    "ALTER TABLE properties ADD COLUMN address TEXT",
    "ALTER TABLE properties ADD COLUMN house_no TEXT DEFAULT ''",
    "ALTER TABLE properties ADD COLUMN size TEXT",
    "ALTER TABLE properties ADD COLUMN rent INTEGER DEFAULT 0",
    "ALTER TABLE properties ADD COLUMN deposit INTEGER DEFAULT 0"
  ];
  for (const sql of migrations) {
    try {
      await env.DB.prepare(sql).run();
    } catch(err) {}
  }
}

function getCorsHeaders(request) {
  const origin = (request && request.headers && request.headers.get("origin")) || "";
  const isAllowed = origin.includes("youestates-property-os.pages.dev") || origin.includes("localhost") || origin.includes("127.0.0.1") || !origin;
  const allowOrigin = isAllowed && origin ? origin : "https://youestates-property-os.pages.dev";
  return {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Property-App-Key",
    "X-Content-Type-Options": "nosniff"
  };
}

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(context.request)
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  try {
    await ensurePropertiesTable(env);
    const { results } = await env.DB.prepare("SELECT * FROM properties ORDER BY created_at DESC").all();
    const formatted = (results || []).map(r => ({
      id: r.id,
      name: r.name,
      lessorKey: r.lessor_key || 'husband',
      type: r.type || 'อสังหาฯ เช่า',
      address: r.address || '',
      houseNo: r.house_no || '',
      size: r.size || '',
      rent: Number(r.rent) || 0,
      deposit: Number(r.deposit) || 0,
      principal: Number(r.principal) || 0,
      installment: Number(r.installment) || 0,
      rate: Number(r.rate) || 4.5,
      startDate: r.start_date || '',
      meterElec: r.meter_elec || '',
      meterWater: r.meter_water || '',
      inventoryList: r.inventory_json ? JSON.parse(r.inventory_json) : [],
      rateSchedule: r.rate_schedule_json ? JSON.parse(r.rate_schedule_json) : [],
      gallery: r.gallery_json ? JSON.parse(r.gallery_json) : []
    }));
    return new Response(JSON.stringify(formatted), {
      headers: getCorsHeaders(request)
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: getCorsHeaders(request)
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    await ensurePropertiesTable(env);
    const data = await request.json();
    const id = data.id || `prop-${Date.now()}`;
    
    await env.DB.prepare(`
      INSERT INTO properties (id, name, lessor_key, type, address, house_no, size, rent, deposit, principal, installment, rate, start_date, meter_elec, meter_water, inventory_json, rate_schedule_json, gallery_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        lessor_key = excluded.lessor_key,
        type = excluded.type,
        address = excluded.address,
        house_no = excluded.house_no,
        size = excluded.size,
        rent = excluded.rent,
        deposit = excluded.deposit,
        principal = excluded.principal,
        installment = excluded.installment,
        rate = excluded.rate,
        start_date = excluded.start_date,
        meter_elec = excluded.meter_elec,
        meter_water = excluded.meter_water,
        inventory_json = excluded.inventory_json,
        rate_schedule_json = excluded.rate_schedule_json,
        gallery_json = excluded.gallery_json
    `).bind(
      id,
      String(data.name || ''),
      String(data.lessorKey || 'husband'),
      String(data.type || 'อสังหาฯ เช่า'),
      String(data.address || ''),
      String(data.houseNo || ''),
      String(data.size || '40 ตร.ม.'),
      Number(data.rent) || 0,
      Number(data.deposit) || 0,
      Number(data.principal) || 0,
      Number(data.installment) || 0,
      Number(data.rate) || 4.5,
      String(data.startDate || ''),
      String(data.meterElec || ''),
      String(data.meterWater || ''),
      JSON.stringify(data.inventoryList || []),
      JSON.stringify(data.rateSchedule || []),
      JSON.stringify(data.gallery || [])
    ).run();

    return new Response(JSON.stringify({ success: true, id }), {
      headers: getCorsHeaders(request)
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: getCorsHeaders(request)
    });
  }
}

export async function onRequestPut(context) {
  return onRequestPost(context);
}

export async function onRequestDelete(context) {
  const { request, env } = context;
  try {
    await ensurePropertiesTable(env);
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return new Response(JSON.stringify({ error: "Property ID required" }), { status: 400, headers: getCorsHeaders(request) });

    await env.DB.prepare("DELETE FROM properties WHERE id = ?").bind(id).run();
    return new Response(JSON.stringify({ success: true, id }), {
      headers: getCorsHeaders(request)
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: getCorsHeaders(request) });
  }
}
