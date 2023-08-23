import { Acordo } from "@/models/Acordos";
import { NextResponse } from "next/server";

export async function GET() {
  const a1: Acordo = {
    id: 1,
    usuarioEmail: "email@domain.com",
    devedorCpf: "123",
    status: "ACEITO PELAS PARTES",
    valor: 100,
    juros: 1,
    diaPagamento: 10,
    qtdParcelas: 10,
    descricao: "Acordo 1"
  };
  const a2: Acordo = {
    id: 2,
    usuarioEmail: "email@domain.com",
    devedorCpf: "234",
    status: "NEGADO PELO INADIMPLENTE",
    valor: 465,
    juros: 2,
    diaPagamento: 8,
    qtdParcelas: 12,
    descricao: "Acordo 2"
  };
  const a3: Acordo = {
    id: 3,
    usuarioEmail: "email@domain.com",
    devedorCpf: "345",
    status: "ACEITO PELAS PARTES",
    valor: 1987,
    juros: 1,
    diaPagamento: 20,
    qtdParcelas: 8,
    descricao: "Acordo 3"
  };
  return NextResponse.json([a1, a2, a3]);
}
