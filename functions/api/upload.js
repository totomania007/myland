function getCorsHeaders(request) {
  const origin = (request && request.headers && request.headers.get("origin")) || "";
  const isAllowed = origin.includes("youestates-property-os.pages.dev") || origin.includes("localhost") || origin.includes("127.0.0.1") || !origin;
  const allowOrigin = isAllowed && origin ? origin : "https://youestates-property-os.pages.dev";
  return {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Property-App-Key",
    "X-Content-Type-Options": "nosniff"
  };
}

async function sha1Hex(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

function extractPublicId(urlOrId) {
  if (!urlOrId) return "";
  if (!urlOrId.startsWith("http")) return urlOrId;
  const match = urlOrId.match(/\/upload\/(?:v\d+\/)?([^\.]+)/);
  if (match && match[1]) {
    return match[1];
  }
  const parts = urlOrId.split("/");
  const filename = parts[parts.length - 1];
  return filename.replace(/\.[^/.]+$/, "");
}

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(context.request)
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const contentType = request.headers.get("content-type") || "";

    // If JSON action delete
    if (contentType.includes("application/json")) {
      const body = await request.json();
      if (body.action === "delete" || body.url || body.publicId) {
        return handleCloudinaryDelete(body.url || body.publicId, env, request);
      }
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), { 
        status: 400,
        headers: getCorsHeaders(request)
      });
    }

    const cloudName = env.CLOUDINARY_CLOUD_NAME || "ogdfbbpw";
    const uploadPreset = env.CLOUDINARY_UPLOAD_PRESET || "house_landlord";
    const apiKey = env.CLOUDINARY_API_KEY;
    const apiSecret = env.CLOUDINARY_API_SECRET;

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);

    // If API Key & Secret are configured, use Signed Upload (No unsigned preset restriction)
    if (apiKey && apiSecret) {
      const timestamp = Math.floor(Date.now() / 1000);
      const signaturePayload = `timestamp=${timestamp}${apiSecret}`;
      const signature = await sha1Hex(signaturePayload);

      cloudinaryFormData.append("timestamp", String(timestamp));
      cloudinaryFormData.append("api_key", apiKey);
      cloudinaryFormData.append("signature", signature);
    } else {
      cloudinaryFormData.append("upload_preset", uploadPreset);
    }

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: cloudinaryFormData
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      const errMsg = data.error && data.error.message ? data.error.message : "Cloudinary upload rejected";
      return new Response(JSON.stringify({ 
        error: errMsg,
        help: errMsg.includes("whitelisted for unsigned uploads") 
          ? "กรุณาตั้งค่า Signing Mode ของ Upload Preset 'house_landlord' ใน Cloudinary Settings ให้เป็น 'Unsigned' หรือเพิ่ม CLOUDINARY_API_KEY / SECRET ใน Cloudflare" 
          : errMsg
      }), {
        status: 400,
        headers: getCorsHeaders(request)
      });
    }

    return new Response(JSON.stringify({
      success: true,
      url: data.secure_url || data.url,
      publicId: data.public_id
    }), {
      headers: getCorsHeaders(request)
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: getCorsHeaders(request)
    });
  }
}

export async function onRequestDelete(context) {
  const { request, env } = context;
  try {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url") || url.searchParams.get("publicId");
    if (!targetUrl) {
      return new Response(JSON.stringify({ error: "Missing url or publicId query parameter" }), {
        status: 400,
        headers: getCorsHeaders(request)
      });
    }
    return handleCloudinaryDelete(targetUrl, env, request);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: getCorsHeaders(request)
    });
  }
}

async function handleCloudinaryDelete(urlOrPublicId, env, request) {
  const cloudName = env.CLOUDINARY_CLOUD_NAME || "ogdfbbpw";
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;
  const publicId = extractPublicId(urlOrPublicId);

  if (!publicId) {
    return new Response(JSON.stringify({ error: "Invalid publicId or URL" }), {
      status: 400,
      headers: getCorsHeaders(request)
    });
  }

  // If Cloudinary API credentials are provided in env, call Destroy API
  if (apiKey && apiSecret) {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const signaturePayload = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
      const signature = await sha1Hex(signaturePayload);

      const destroyFormData = new FormData();
      destroyFormData.append("public_id", publicId);
      destroyFormData.append("api_key", apiKey);
      destroyFormData.append("timestamp", String(timestamp));
      destroyFormData.append("signature", signature);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
        method: "POST",
        body: destroyFormData
      });
      const data = await res.json();

      return new Response(JSON.stringify({
        success: true,
        cloudDeleted: data.result === "ok",
        result: data.result,
        publicId
      }), {
        headers: getCorsHeaders(request)
      });
    } catch (apiErr) {
      return new Response(JSON.stringify({
        success: true,
        cloudDeleted: false,
        warning: apiErr.message,
        publicId
      }), {
        headers: getCorsHeaders(request)
      });
    }
  }

  // If secret is not yet set in Cloudflare env, return success for app record deletion
  return new Response(JSON.stringify({
    success: true,
    cloudDeleted: false,
    publicId,
    note: "Deleted from database and application. To delete cloud file automatically, add CLOUDINARY_API_KEY & CLOUDINARY_API_SECRET to Cloudflare environment variables."
  }), {
    headers: getCorsHeaders(request)
  });
}
