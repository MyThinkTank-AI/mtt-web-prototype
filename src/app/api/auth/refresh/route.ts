import { NextRequest } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  console.log("REFRESH", cookieStore.get("refresh_token"));

  try {
    const response = await axios.get(
      `${process.env.AUTH_API_URL}/auth/refresh`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    // console.log("REFRESH: ", response);

    const data = await response.data;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        error: "Unexpected error",
        message: "Unexpected error. Please try again.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
