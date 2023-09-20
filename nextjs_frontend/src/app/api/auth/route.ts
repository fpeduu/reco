const bcrypt = require("bcryptjs");
import { connectToDatabase } from "@/middlewares/mongodb";
import Usuarios from "@/models/Usuarios";
import { NextRequest, NextResponse } from "next/server";

interface Credentials {
  csrfToken: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const credentials: Credentials = await req.json();

  connectToDatabase();

  const user = await Usuarios.findOne({ email: credentials.email });

  if (!user) return NextResponse.error();

  const passwordMatches = await bcrypt.compare(
    credentials.password,
    user.password
  );

  if (passwordMatches) {
    return NextResponse.json(user);
  } else {
    return NextResponse.error();
  }
}
