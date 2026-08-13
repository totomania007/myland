/**
 * CLOUDFLARE PAGES FUNCTION — /api/lessors API
 * Cloudflare D1 Database CRUD Handlers for Lessors
 */

export async function onRequestGet(context) {
  const { env } = context;
  if (!env.DB) {
    return new Response(JSON.stringify({ error: "Cloudflare D1 Database (DB) binding not found." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const { results } = await env.DB.prepare(`
      SELECT id, name, id_card as idCard, age, phone, address, image_url as imageUrl, created_at
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
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!env.DB) {
    return new Response(JSON.stringify({ error: "Cloudflare D1 Database (DB) binding not found." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const body = await request.json();
    const id = body.id || 'lessor-' + Date.now();
    const name = body.name || '';
    const idCard = body.idCard || '';
    const age = parseInt(body.age) || 45;
    const phone = body.phone || '';
    const address = body.address || '';
    const imageUrl = body.imageUrl || '';

    await env.DB.prepare(`
      INSERT INTO lessors (id, name, id_card, age, phone, address, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        id_card = excluded.id_card,
        age = excluded.age,
        phone = excluded.phone,
        address = excluded.address,
        image_url = excluded.image_url
    `).bind(id, name, idCard, age, phone, address, imageUrl).run();

    return new Response(JSON.stringify({ success: true, id }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestDelete(context) {
  const { request, env } = context;
  if (!env.DB) {
    return new Response(JSON.stringify({ error: "DB binding missing" }), { status: 500 });
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
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
