import { Devedor } from "@/models/Devedores";
import { NextResponse } from "next/server";

export async function GET() {
  const d1: Devedor = {
    cpf: "123",
    nome: "Fulano",
    mensalidadesAtrasadas: 0,
    condominioCnpj: "098"
  };
  const d2: Devedor = {
    cpf: "234",
    nome: "Beltrano",
    mensalidadesAtrasadas: 1,
    condominioCnpj: "987"
  };
  const d3: Devedor = {
    cpf: "345",
    nome: "Sicrano",
    mensalidadesAtrasadas: 2,
    condominioCnpj: "876"
  };
  const d4: Devedor = {
    cpf: "456",
    nome: "Fulano2",
    mensalidadesAtrasadas: 10,
    condominioCnpj: "765"
  };
  const d5: Devedor = {
    cpf: "567",
    nome: "Beltrano2",
    mensalidadesAtrasadas: 2,
    condominioCnpj: "765"
  };
  return NextResponse.json([d1, d2, d3, d4, d5]);
}
