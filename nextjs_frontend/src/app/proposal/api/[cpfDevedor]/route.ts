import { NextResponse } from "next/server";
import { Acordo } from "@/models/Acordos";
import { randomInt } from "crypto";

const top = [
  {
    id: 0,
    usuarioEmail: "a@b.com",
    devedorCpf: "123",
    status: "Pendente",
    valor: 1000,
    juros: 0,
    diaPagamento: 8,
    qtdParcelas: 3,
    descricao: "90% de chance de aceitação\nRetorno de XXX ao condomínio."
  },
  {
    id: 1,
    usuarioEmail: "b@b.com",
    devedorCpf: "234",
    status: "Pendente",
    valor: 1200,
    juros: 0.01,
    diaPagamento: 20,
    qtdParcelas: 2,
    descricao: "Retorno de XXX ao condomínio."
  },
  {
    id: 2,
    usuarioEmail: "c@b.com",
    devedorCpf: "345",
    status: "Pendente",
    valor: 800,
    juros: 0.01,
    diaPagamento: 12,
    qtdParcelas: 3,
    descricao: "Retorno de XXX ao condomínio."
  }
];

const top2 = [
  {
    id: 0,
    usuarioEmail: "a@b.com",
    devedorCpf: "123",
    status: "Pendente",
    valor: 2000,
    juros: 0,
    diaPagamento: 8,
    qtdParcelas: 3,
    descricao: "90% de chance de aceitação\nRetorno de XXX ao condomínio."
  },
  {
    id: 1,
    usuarioEmail: "b@b.com",
    devedorCpf: "234",
    status: "Pendente",
    valor: 1576,
    juros: 0.02,
    diaPagamento: 20,
    qtdParcelas: 2,
    descricao: "Retorno de XXX ao condomínio."
  },
  {
    id: 2,
    usuarioEmail: "c@b.com",
    devedorCpf: "345",
    status: "Pendente",
    valor: 946,
    juros: 0.01,
    diaPagamento: 12,
    qtdParcelas: 3,
    descricao: "Retorno de XXX ao condomínio."
  }
];

export async function GET(req: Request) {
  const index = randomInt(0, 2);
  const acordos: Acordo[] = index === 0 ? top : top2;
  return NextResponse.json(acordos);
}

export async function POST(req: Request) {
  const newAcordo: Acordo = await req.json();
  return NextResponse.json(newAcordo);
}
