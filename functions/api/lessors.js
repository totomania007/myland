/**
 * CLOUDFLARE PAGES FUNCTION — /api/lessors API
 * Cloudflare D1 Database CRUD Handlers for Lessors (Auto-Table Creation & Fail-safe)
 */

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS lessors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    id_card TEXT NOT NULL,
    age INTEGER DEFAULT 45,
    phone TEXT,
    address TEXT,
    image_url TEXT,
    line_id TEXT,
    facebook TEXT,
    email TEXT,
    x_twitter TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

async function ensureLessorMigrations(env) {
  if (!env || !env.DB) return;
  const migrations = [
    "ALTER TABLE lessors ADD COLUMN line_id TEXT",
    "ALTER TABLE lessors ADD COLUMN facebook TEXT",
    "ALTER TABLE lessors ADD COLUMN email TEXT",
    "ALTER TABLE lessors ADD COLUMN x_twitter TEXT"
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
    await env.DB.prepare(CREATE_TABLE_SQL).run();
    await ensureLessorMigrations(env);

    const { results } = await env.DB.prepare(`
      SELECT 
        id, 
        name, 
        id_card as idCard, 
        age, 
        phone, 
        address, 
        image_url as imageUrl,
        line_id as lineId,
        facebook,
        email,
        x_twitter as xTwitter,
        created_at
      FROM lessors ORDER BY created_at DESC
    `).all();

    return new Response(JSON.stringify(results || []), {
      status: 200,
      headers: { 
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    console.warn("D1 Lessors GET Warning:", err);
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
    await env.DB.prepare(CREATE_TABLE_SQL).run();
    await ensureLessorMigrations(env);

    const body = await request.json();
    const id = body.id || 'lessor-' + Date.now();
    const name = body.name || '';
    const idCard = body.idCard || '';
    const age = parseInt(body.age) || 45;
    const phone = body.phone || '';
    const address = body.address || '';
    const imageUrl = body.imageUrl || '';
    const lineId = body.lineId || '';
    const facebook = body.facebook || '';
    const email = body.email || '';
    const xTwitter = body.xTwitter || '';

    await env.DB.prepare(`
      INSERT INTO lessors (id, name, id_card, age, phone, address, image_url, line_id, facebook, email, x_twitter)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        id_card = excluded.id_card,
        age = excluded.age,
        phone = excluded.phone,
        address = excluded.address,
        image_url = excluded.image_url,
        line_id = excluded.line_id,
        facebook = excluded.facebook,
        email = excluded.email,
        x_twitter = excluded.x_twitter
    `).bind(id, name, idCard, age, phone, address, imageUrl, lineId, facebook, email, xTwitter).run();

    return new Response(JSON.stringify({ success: true, id }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    console.warn("D1 Lessors POST Warning:", err);
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

    await env.DB.prepare(`DELETE FROM lessors WHERE id = ?`).bind(id).run();

    return new Response(JSON.stringify({ success: true, id }), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: true, warning: err.message }), { status: 200 });
  }
}
