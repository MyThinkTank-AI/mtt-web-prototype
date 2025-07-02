import { NextRequest } from "next/server";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();

  try {
    const response = await axios.get(
      `${process.env.AUTH_API_URL}/auth/refresh`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    const data = await response.data;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: AxiosError | any) {
      return new Response(
        JSON.stringify({
          error,
          message: error?.response?.data.message || "Unexpected error. Please try again.",
        }),
        {
          status: error?.response?.data.statusCode || 500,
        },
      );
    }
}
