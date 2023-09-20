const bcrypt = require("bcryptjs");
import { NextRequest, NextResponse } from "next/server";

interface Credentials {
  csrfToken: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const credentials: Credentials = await req.json();

  if (credentials.email == "lipe@gmail.com") {
    // ! substituir pela verificação de se o usuário EXISTE
    const passwordMatches = await bcrypt.compare(
      credentials.password, // ! verificar senha
      "$2a$10$1fWZFLHvw2iAg21.z6.HiO9jyAURFfZNvlYeqP3PSnHv46.VacLL6"
    );

    if (passwordMatches) {
      const user = {
        // ! retornar usuário do banco
        name: "lipe",
        email: "lipe@gmail.com",
      };

      return NextResponse.json(user);
    }
  } else {
    return NextResponse.error();
  }
}
