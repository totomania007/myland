/**
 * CLOUDFLARE PAGES FUNCTION — /api/tenants API
 * Cloudflare D1 Database CRUD Handlers for Registered Tenants
 */

const CREATE_TENANTS_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS tenants (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    age INTEGER DEFAULT 35,
    id_card TEXT,
    phone TEXT,
    address TEXT,
    unit_name TEXT,
    house_no TEXT,
    rent INTEGER DEFAULT 0,
    deposit INTEGER DEFAULT 0,
    start_date TEXT,
    duration TEXT DEFAULT '1',
    end_date TEXT,
    prop_id TEXT,
    image_url TEXT,
    line_id TEXT,
    facebook TEXT,
    email TEXT,
    x_twitter TEXT,
    emergency_contact TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

async function ensureTenantMigrations(env) {
  if (!env || !env.DB) return;
  const migrations = [
    "ALTER TABLE tenants ADD COLUMN line_id TEXT",
    "ALTER TABLE tenants ADD COLUMN facebook TEXT",
    "ALTER TABLE tenants ADD COLUMN email TEXT",
    "ALTER TABLE tenants ADD COLUMN x_twitter TEXT",
    "ALTER TABLE tenants ADD COLUMN emergency_contact TEXT"
  ];
  for (const sql of migrations) {
    try { await env.DB.prepare(sql).run(); } catch(e) {}
  }
}

export async function onRequestGet(context) {
  const { env } = context;
  if (!env || !env.DB) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }

  try {
    await env.DB.prepare(CREATE_TENANTS_TABLE_SQL).run();
    await ensureTenantMigrations(env);

    const { results } = await env.DB.prepare(`
      SELECT 
        id, 
        full_name as fullName, 
        age, 
        id_card as idCard, 
        phone, 
        address, 
        unit_name as unitName, 
        house_no as houseNo, 
        rent, 
        deposit, 
        start_date as startDate, 
        duration, 
        end_date as endDate, 
        prop_id as propId, 
        image_url as imageUrl,
        line_id as lineId,
        facebook,
        email,
        x_twitter as xTwitter,
        emergency_contact as emergencyContact,
        created_at
      FROM tenants ORDER BY created_at DESC
    `).all();

    return new Response(JSON.stringify(results || []), {
      status: 200,
      headers: { 
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    console.warn("D1 Tenants GET Warning:", err);
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!env || !env.DB) {
    return new Response(JSON.stringify({ success: true, warning: "DB binding missing" }), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }

  try {
    await env.DB.prepare(CREATE_TENANTS_TABLE_SQL).run();
    await ensureTenantMigrations(env);

    const body = await request.json();
    const id = body.id || 'tenant-' + Date.now();
    const fullName = body.fullName || body.full_name || '';
    const age = parseInt(body.age) || 35;
    const idCard = body.idCard || body.id_card || '-';
    const phone = body.phone || '-';
    const address = body.address || '-';
    const unitName = body.unitName || body.unit_name || '-';
    const houseNo = body.houseNo || body.house_no || '-';
    const rent = Number(body.rent) || 0;
    const deposit = Number(body.deposit) || 0;
    const startDate = body.startDate || body.start_date || '';
    const duration = String(body.duration || '1');
    const endDate = body.endDate || body.end_date || '';
    const propId = body.propId || body.prop_id || '';
    const imageUrl = body.imageUrl || body.image_url || '';
    const lineId = body.lineId || '';
    const facebook = body.facebook || '';
    const email = body.email || '';
    const xTwitter = body.xTwitter || '';
    const emergencyContact = body.emergencyContact || body.emergency_contact || '';

    await env.DB.prepare(`
      INSERT INTO tenants (id, full_name, age, id_card, phone, address, unit_name, house_no, rent, deposit, start_date, duration, end_date, prop_id, image_url, line_id, facebook, email, x_twitter, emergency_contact)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        full_name = excluded.full_name,
        age = excluded.age,
        id_card = excluded.id_card,
        phone = excluded.phone,
        address = excluded.address,
        unit_name = excluded.unit_name,
        house_no = excluded.house_no,
        rent = excluded.rent,
        deposit = excluded.deposit,
        start_date = excluded.start_date,
        duration = excluded.duration,
        end_date = excluded.end_date,
        prop_id = excluded.prop_id,
        image_url = excluded.image_url,
        line_id = excluded.line_id,
        facebook = excluded.facebook,
        email = excluded.email,
        x_twitter = excluded.x_twitter,
        emergency_contact = excluded.emergency_contact
    `).bind(id, fullName, age, idCard, phone, address, unitName, houseNo, rent, deposit, startDate, duration, endDate, propId, imageUrl, lineId, facebook, email, xTwitter, emergencyContact).run();

    return new Response(JSON.stringify({ success: true, id }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    console.warn("D1 Tenants POST Warning:", err);
    return new Response(JSON.stringify({ success: true, warning: err.message }), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }
}

export async function onRequestDelete(context) {
  const { request, env } = context;
  if (!env || !env.DB) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing id parameter" }), { status: 400 });
    }

    await env.DB.prepare(CREATE_TENANTS_TABLE_SQL).run();
    await env.DB.prepare(`DELETE FROM tenants WHERE id = ?`).bind(id).run();

    return new Response(JSON.stringify({ success: true, id }), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: true, warning: err.message }), { status: 200 });
  }
}
