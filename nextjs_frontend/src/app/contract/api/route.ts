import { NextResponse } from 'next/server';
import Acordos from '@/models/Acordos';
import { Acordo } from '@/models/Acordos';
import { connectToDatabase } from '@/middlewares/mongodb';

export async function GET(req: Request) {
    await connectToDatabase();
    const acordos: Acordo[] = await Acordos.find();
    return NextResponse.json(acordos);
}

export async function POST(req: Request) {
    await connectToDatabase();
    const newAcordo: Acordo = {
        id: 0,
        descricao: "Teste",
        devedorCpf: "12345678910",
        diaPagamento: new Date(),
        valor: 1000,
        status: "Pendente",
        juros: 0.1,
        qtdParcelas: 10,
        usuarioEmail: "teste@email.com",
    }

    const acordo = await Acordos.create(newAcordo);
    return NextResponse.json(acordo);
}

export async function DELETE(req: Request) {
    await connectToDatabase();
    const acordos = await Acordos.deleteMany({});
    return NextResponse.json(acordos);
}