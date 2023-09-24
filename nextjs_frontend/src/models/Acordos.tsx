import mongoose from "mongoose";

export enum StatusType {
  "Aguardando inadimplente",
  "Conversa iniciada",
  "Primeira proposta realizada",
  "Segunda proposta realizada",
  "Terceira proposta realizada",
  "Aguardando confirmação da proposta",
  "Acordo realizado",
  "Acordo rejeitado",
}

export interface Proposta {
  entrada: number;
  valorParcela: number;
  qtdParcelas: number;
}

export interface Acordo {
  usuarioEmail: string;
  cpfDevedor: string;
  dataAcordo?: Date;
  status: StatusType;

  entrada: number;
  valorTotal: number;
  qtdParcelas: number;
  historicoValores: Proposta[];
}

export interface AcordoIdentificado extends Acordo {
  nomeDevedor: string;
  nomeCondominio: string;
}

const AcordoSchema = new mongoose.Schema({
  usuarioEmail: {
    type: String,
    required: true,
  },
  cpfDevedor: {
    type: String,
    required: true,
  },
  dataAcordo: {
    type: Date,
    default: Date.now,
  },
  status: String,
  entrada: Number,
  valorTotal: Number,
  qtdParcelas: Number,
  historicoValores: [
    { entrada: Number, valorParcela: Number, qtdParcelas: Number },
  ],
});

export default mongoose.models.Acordos ||
  mongoose.model("Acordos", AcordoSchema);
