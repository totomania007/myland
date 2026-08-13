export async function onRequestGet(context) {
  const { env } = context;
  try {
    const { results } = await env.DB.prepare("SELECT * FROM properties ORDER BY created_at DESC").all();
    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const data = await request.json();
    const id = data.id || `prop-${Date.now()}`;
    
    await env.DB.prepare(`
      INSERT INTO properties (id, name, lessor_key, type, address, house_no, size, rent, deposit, principal, installment, rate, start_date, meter_elec, meter_water)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id, data.name, data.lessorKey || 'husband', data.type || 'คอนโดมีเนียม',
      data.address || '', data.houseNo, data.size || '', data.rent || 0,
      data.deposit || 0, data.principal || 0, data.installment || 0,
      data.rate || 4.5, data.startDate || '', data.meterElec || '', data.meterWater || ''
    ).run();
    return new Response(JSON.stringify({ success: true, id }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function onRequestPut(context) {
  const { request, env } = context;
  try {
    const data = await request.json();
    if (!data.id) {
      return new Response(JSON.stringify({ error: "Property ID required" }), { status: 400 });
    }

    await env.DB.prepare(`
      UPDATE properties SET
        name = ?, lessor_key = ?, type = ?, address = ?, house_no = ?,
        size = ?, rent = ?, deposit = ?, principal = ?, installment = ?,
        rate = ?, start_date = ?, meter_elec = ?, meter_water = ?
      WHERE id = ?
    `).bind(
      data.name, data.lessorKey || 'lessor-1', data.type || 'อสังหาฯ เช่า',
      data.address || '', data.houseNo || '', data.size || '', data.rent || 0,
      data.deposit || 0, data.principal || 0, data.installment || 0,
      data.rate || 4.5, data.startDate || '', data.meterElec || '', data.meterWater || '',
      data.id
    ).run();

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function onRequestDelete(context) {
  const { request, env } = context;
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ error: "Property ID required" }), { status: 400 });
    }

    await env.DB.prepare("DELETE FROM properties WHERE id = ?").bind(id).run();
    return new Response(JSON.stringify({ success: true, id }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
