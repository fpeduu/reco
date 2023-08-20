import { NextRequest, NextResponse } from "next/server";
import Usuarios, { Usuario } from "@/models/Usuarios";

export async function GET(req: NextRequest) {
  const usuario: Usuario = await req.json();

  const hasUsuarios = await Usuarios.find({ email: usuario.email });

  if (hasUsuarios.length > 0) {
    return NextResponse.json(hasUsuarios);
  } else {
    return NextResponse.json({ error: "Usuário não cadastrado!" });
  }
}

export async function POST(req: Request) {
  const newUsuario: Usuario = await req.json();
  const hasUsuario = await Usuarios.find({ email: newUsuario.email });

  if (hasUsuario.length > 0) {
    return NextResponse.json({ error: "Usuário já cadastrado!" });
  }

  const created = await Usuarios.create(newUsuario);

  return NextResponse.json(created);
}
