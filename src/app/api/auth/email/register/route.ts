import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Register request received");
  const response = await fetch("http://localhost:8080/auth/email/register", {
    method: "POST",
    body: req.body,
  });

  const data = await response.json();
  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: data.error || "Register failed" }),
      {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
