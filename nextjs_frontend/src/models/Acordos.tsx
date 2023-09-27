import mongoose from "mongoose";

export type StatusType =
  | "Aguardando inadimplente"
  | "Conversa iniciada"
  | "Primeira proposta"
  | "Segunda proposta"
  | "Proposta do inadimplente"
  | "Aguardando aprovação"
  | "Acordo aceito"
  | "Acordo recusado";

export interface Proposta {
  aceito: boolean;
  entrada: number;
  qtdParcelas: number;
  valorParcela: number;
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
    required: true
  },
  cpfDevedor: {
    type: String,
    required: true
  },
  dataAcordo: {
    type: Date,
    default: Date.now
  },
  status: String,
  entrada: Number,
  valorTotal: Number,
  qtdParcelas: Number,
  historicoValores: [{
    entrada: Number,
    aceito: Boolean,
    qtdParcelas: Number,
    valorParcela: Number,
  }]
});

export default mongoose.models.Acordos || mongoose.model("Acordos", AcordoSchema);
