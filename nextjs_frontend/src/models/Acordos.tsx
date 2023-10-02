import mongoose from "mongoose";
import { RegrasProposta } from "./Usuarios";

export type StatusType =
  | "Aguardando inadimplente"
  | "Conversa iniciada"
  | "Primeira proposta"
  | "Segunda proposta"
  | "Proposta do inadimplente"
  | "Aguardando aprovação"
  | "Acordo aceito"
  | "Acordo recusado";

export type AuthorType = "Bot" | "User";

export interface Proposta {
  autor: AuthorType;
  aceito: boolean;
  entrada: number;
  motivo?: string;
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
  regraProposta: RegrasProposta;
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
  regraProposta: {
    mesesAtraso: Number,
    melhorEntrada: {
      type: Number,
      default: 0,
    },
    melhorParcela: Number,
    piorParcela: Number,
    piorEntrada: {
      type: Number,
      default: 0
    },
  },
  historicoValores: [
    {
      autor: String,
      motivo: String,
      entrada: Number,
      aceito: Boolean,
      qtdParcelas: Number,
      valorParcela: Number,
    },
  ],
});

export default mongoose.models.Acordos ||
  mongoose.model("Acordos", AcordoSchema);
