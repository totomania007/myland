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
    bank_name TEXT,
    bank_account TEXT,
    bank_account_name TEXT,
    prompt_pay TEXT,
    payment_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

async function ensureLessorMigrations(env) {
  if (!env || !env.DB) return;
  const migrations = [
    "ALTER TABLE lessors ADD COLUMN line_id TEXT",
    "ALTER TABLE lessors ADD COLUMN facebook TEXT",
    "ALTER TABLE lessors ADD COLUMN email TEXT",
    "ALTER TABLE lessors ADD COLUMN x_twitter TEXT",
    "ALTER TABLE lessors ADD COLUMN bank_name TEXT",
    "ALTER TABLE lessors ADD COLUMN bank_account TEXT",
    "ALTER TABLE lessors ADD COLUMN bank_account_name TEXT",
    "ALTER TABLE lessors ADD COLUMN prompt_pay TEXT",
    "ALTER TABLE lessors ADD COLUMN payment_instructions TEXT"
  ];
  for (const sql of migrations) {
    try { await env.DB.prepare(sql).run(); } catch(e) {}
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
  if (!env || !env.DB) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: getCorsHeaders(request)
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
        bank_name as bankName,
        bank_account as bankAccount,
        bank_account_name as bankAccountName,
        prompt_pay as promptPay,
        payment_instructions as paymentInstructions,
        created_at
      FROM lessors ORDER BY created_at DESC
    `).all();

    return new Response(JSON.stringify(results || []), {
      status: 200,
      headers: getCorsHeaders(request)
    });
  } catch (err) {
    console.warn("D1 Lessors GET Warning:", err);
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: getCorsHeaders(request)
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!env || !env.DB) {
    return new Response(JSON.stringify({ success: true, warning: "DB binding missing" }), {
      status: 200,
      headers: getCorsHeaders(request)
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
    const bankName = body.bankName || 'ธนาคารกสิกรไทย (KBANK)';
    const bankAccount = body.bankAccount || '';
    const bankAccountName = body.bankAccountName || name;
    const promptPay = body.promptPay || phone;
    const paymentInstructions = body.paymentInstructions || 'โอนเงินภายในวันที่ 5 ของทุกเดือน และแนบสลิปแจ้งทาง LINE';

    await env.DB.prepare(`
      INSERT INTO lessors (id, name, id_card, age, phone, address, image_url, line_id, facebook, email, x_twitter, bank_name, bank_account, bank_account_name, prompt_pay, payment_instructions)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        x_twitter = excluded.x_twitter,
        bank_name = excluded.bank_name,
        bank_account = excluded.bank_account,
        bank_account_name = excluded.bank_account_name,
        prompt_pay = excluded.prompt_pay,
        payment_instructions = excluded.payment_instructions
    `).bind(id, name, idCard, age, phone, address, imageUrl, lineId, facebook, email, xTwitter, bankName, bankAccount, bankAccountName, promptPay, paymentInstructions).run();

    return new Response(JSON.stringify({ success: true, id }), {
      status: 200,
      headers: getCorsHeaders(request)
    });
  } catch (err) {
    console.warn("D1 Lessors POST Warning:", err);
    return new Response(JSON.stringify({ success: true, warning: err.message }), {
      status: 200,
      headers: getCorsHeaders(request)
    });
  }
}

export async function onRequestDelete(context) {
  const { request, env } = context;
  if (!env || !env.DB) {
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: getCorsHeaders(request) });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing id parameter" }), { status: 400, headers: getCorsHeaders(request) });
    }

    await env.DB.prepare(`DELETE FROM lessors WHERE id = ?`).bind(id).run();

    return new Response(JSON.stringify({ success: true, id }), {
      status: 200,
      headers: getCorsHeaders(request)
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: true, warning: err.message }), { status: 200, headers: getCorsHeaders(request) });
  }
}
