import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

import { getRefreshToken } from "@/lib/parseCookies";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const body = await req.json();


  try {
    console.log("Request:", body, `${process.env.AUTH_API_URL}/auth/email/login`);

    const response = await axios.post(
      `${process.env.AUTH_API_URL}/auth/email/login`,
      body,
      { withCredentials: true },
    );

    console.log("Response:", response);

    const { value, maxAge, expires, httpOnly } = getRefreshToken(
      response.headers["set-cookie"]!,
    );

    cookieStore.set("refresh_token", value, {
      maxAge,
      expires,
      httpOnly,
    });

    const data = await response.data;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error,
        message: "Unexpected error. Please try again.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
