import { Condominio } from "@/models/Condominios";
import { NextResponse } from "next/server";

export async function GET() {
  const c1: Condominio = {
    cnpj: "098",
    nome: "Condominio 1",
    valorMensalidade: 100,
    administradorEmail: "adm1@gmail.com"
  };
  const c2: Condominio = {
    cnpj: "987",
    nome: "Condominio 2",
    valorMensalidade: 200,
    administradorEmail: "adm2@gmail.com"
  };
  const c3: Condominio = {
    cnpj: "876",
    nome: "Condominio 3",
    valorMensalidade: 150,
    administradorEmail: "adm3@gmail.com"
  };
  return NextResponse.json([c1, c2, c3]);
}
