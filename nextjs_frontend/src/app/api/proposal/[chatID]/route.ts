import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/middlewares/mongodb";

import Devedores, { Devedor } from "@/models/Devedores";
import Usuarios, { Usuario } from "@/models/Usuarios";
import Acordos, { Acordo } from "@/models/Acordos";
import { NegotiationData } from "@/types/negotiation.dto";

export async function GET(request: NextRequest) {
    connectToDatabase();

    const { pathname } = new URL(request.url);
    const cpfDevedor = pathname.split("/").pop() as string;
    const devedor: Devedor | null = await Devedores.findOne({
        cpf: cpfDevedor,
    });
    if (!devedor) {
        return NextResponse.json({
            "error": "No debtor found"
        });
    }

    const emailAdministrador = devedor?.emailAdministrador;
    const userInfos: Usuario | null = await Usuarios.findOne({
        email: emailAdministrador
    });
    if (!userInfos) {
        return NextResponse.json({
            "error": "No user found"
        });
    }

    for (const rule of userInfos.regrasProposta) {
        if (rule.mesesAtraso === devedor.mensalidadesAtrasadas) {
            return NextResponse.json(rule);
        }
    }
    const lastOne = userInfos.regrasProposta.length - 1;
    const lastRule = userInfos.regrasProposta[lastOne];

    const proposal: Acordo | null = await Acordos.findOne({ 
        cpfDevedor
    });
    if (!proposal) {
        return NextResponse.json({
            "error": "No proposal found"
        });
    }

    const response: NegotiationData = {
        cpf: devedor.cpf,
        nome: devedor.nome,
        valorDivida: devedor.valorDivida,
        nomeCondominio: devedor.nomeCondominio,
        emailAdministrador: devedor.emailAdministrador,
        mensalidadesAtrasadas: devedor.mensalidadesAtrasadas,
        proposals: proposal.historicoValores,
        contact: userInfos.contact,
        status: proposal.status,
        rules: lastRule,
    };

    return NextResponse.json(response);
}