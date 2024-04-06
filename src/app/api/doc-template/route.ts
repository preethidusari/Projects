import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { getUser } = getKindeServerSession();
  const user = getUser();

  const { id: userId } = user;
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const response = await fetch(
    "https://ideal-yodel-9g77rxgvgpwh9pg6-5000.app.github.dev/get-template",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    }
  );
  return new Response(await response.blob());
};
