import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = {
    nome: "Lipe",
    email: "lipe@gmail.com",
  }; // não é do tipo usuário pq não pode retornar senha

  return NextResponse.json(user);
}
