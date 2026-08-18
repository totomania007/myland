function getCorsHeaders(request) {
  const origin = (request && request.headers && request.headers.get("origin")) || "";
  const isAllowed = origin.includes("youestates-property-os.pages.dev") || origin.includes("localhost") || origin.includes("127.0.0.1") || !origin;
  const allowOrigin = isAllowed && origin ? origin : "https://youestates-property-os.pages.dev";
  return {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
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

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
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

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("upload_preset", uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: cloudinaryFormData
    });

    const data = await res.json();

    return new Response(JSON.stringify({
      success: true,
      url: data.secure_url || data.url
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
