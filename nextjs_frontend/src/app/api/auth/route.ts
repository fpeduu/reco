const bcrypt = require("bcryptjs");
import { connectToDatabase } from "@/middlewares/mongodb";
import Usuarios, { Usuario } from "@/models/Usuarios";
import { NextRequest, NextResponse } from "next/server";

interface Credentials {
  csrfToken: string;
  email: string;
  password: string;
}

export async function GET(req: NextRequest) {
  connectToDatabase();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const user = await Usuarios.findOne({ email });

  if (!user) {
    return NextResponse.json(
      {
        error: "Usuário não encontrado"
      },
      { status: 404 }
    );
  }

  const returnUser: Usuario = {
    password: "",
    nome: user.nome,
    email: user.email,
    contact: user.contact,
    regrasProposta: user.regrasProposta
  };

  return NextResponse.json(returnUser);
}

export async function POST(req: NextRequest) {
  connectToDatabase();

  const credentials: Credentials = await req.json();
  const user = await Usuarios.findOne({ email: credentials.email });

  if (!user) {
    return NextResponse.json(
      {
        error: "Usuário não encontrado"
      },
      { status: 401 }
    );
  }

  const passwordMatches = await bcrypt.compare(credentials.password, user.password);

  if (passwordMatches) {
    return NextResponse.json(user);
  }
  return NextResponse.json(
    {
      error: "Senha incorreta"
    },
    { status: 401 }
  );
}
