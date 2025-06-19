import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch("http://192.168.1.78:8080/auth/email/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
