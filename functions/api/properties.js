async function ensurePropertiesTable(env) {
  try {
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS properties (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        lessor_key TEXT NOT NULL DEFAULT 'husband',
        type TEXT DEFAULT 'อสังหาฯ เช่า',
        address TEXT,
        house_no TEXT NOT NULL,
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `).run();
  } catch(e) {}
}

export async function onRequestGet(context) {
  const { env } = context;
  try {
    await ensurePropertiesTable(env);
    const { results } = await env.DB.prepare("SELECT * FROM properties ORDER BY created_at DESC").all();
    const formatted = (results || []).map(r => ({
      id: r.id,
      name: r.name,
      lessorKey: r.lessor_key,
      type: r.type,
      address: r.address,
      houseNo: r.house_no,
      size: r.size,
      rent: r.rent,
      deposit: r.deposit,
      principal: r.principal,
      installment: r.installment,
      rate: r.rate,
      startDate: r.start_date,
      meterElec: r.meter_elec,
      meterWater: r.meter_water,
      inventoryList: r.inventory_json ? JSON.parse(r.inventory_json) : [],
      rateSchedule: r.rate_schedule_json ? JSON.parse(r.rate_schedule_json) : []
    }));
    return new Response(JSON.stringify(formatted), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    await ensurePropertiesTable(env);
    const data = await request.json();
    const id = data.id || `prop-${Date.now()}`;
    
    await env.DB.prepare(`
      INSERT INTO properties (id, name, lessor_key, type, address, house_no, size, rent, deposit, principal, installment, rate, start_date, meter_elec, meter_water, inventory_json, rate_schedule_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        rate_schedule_json = excluded.rate_schedule_json
    `).bind(
      id, data.name || '', data.lessorKey || 'husband', data.type || 'อสังหาฯ เช่า',
      data.address || '', data.houseNo || '', data.size || '40 ตร.ม.', data.rent || 0,
      data.deposit || 0, data.principal || 0, data.installment || 0,
      data.rate || 4.5, data.startDate || '', data.meterElec || '', data.meterWater || '',
      JSON.stringify(data.inventoryList || []), JSON.stringify(data.rateSchedule || [])
    ).run();

    return new Response(JSON.stringify({ success: true, id }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
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
    if (!id) return new Response(JSON.stringify({ error: "Property ID required" }), { status: 400 });

    await env.DB.prepare("DELETE FROM properties WHERE id = ?").bind(id).run();
    return new Response(JSON.stringify({ success: true, id }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
