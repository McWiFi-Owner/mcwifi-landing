export async function onRequestPost({ request, env }) {
  const data  = await request.formData();
  const email = (data.get("email") || "").trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return new Response(JSON.stringify({ ok:false, error:"bad_email" }), { status:400 });

  await env.SUBSCRIBERS_KV.put(email, Date.now().toString());
  return new Response(JSON.stringify({ ok:true }), {
    headers: { "Content-Type": "application/json" }
  });
}
