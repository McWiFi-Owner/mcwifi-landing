export async function onRequestPost({ request, env }) {
  const host = request.headers.get("host");
  const ts   = Date.now();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return new Response(JSON.stringify({ ok:false, error:"bad_email" }), { status:400 });

  await env.SUBSCRIBERS_KV.put(
    email,
    JSON.stringify({ ts, host }),
    { metadata: { host, ts } }   
  );
