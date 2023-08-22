import { NextRequest, NextResponse } from "next/server";

interface Credentials {
  csrfToken: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const credentials: Credentials = await req.json()
  const user = {
    nome: "Lipe",
    email: credentials.email,
  };

  return NextResponse.json(user);
}
