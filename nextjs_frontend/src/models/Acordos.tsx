import mongoose from "mongoose";
import { RegrasProposta } from "./Usuarios";

export type StatusType =
  | "Aguardando inadimplente"
  | "Primeira proposta"
  | "Segunda proposta"
  | "Proposta do inadimplente"
  | "Decisão do inadimplente"
  | "Aguardando aprovação"
  | "Acordo aceito"
  | "Acordo recusado";

export type AuthorType = "Bot" | "User";

export interface Proposta {
  autor: AuthorType;
  aceito: boolean;
  entrada: number;
  motivo?: string;
  status: StatusType;
  qtdParcelas: number;
  valorParcela: number;
}

export interface Acordo {
  identificador: string;
  dataAtualizacao?: Date;
  dataCriacao?: Date;

  usuarioEmail: string;
  cpfDevedor: string;
  status: StatusType;

  entrada: number;
  valorTotal: number;
  qtdParcelas: number;
  historicoValores: Proposta[];
  regraProposta: RegrasProposta;
}

const AcordoSchema = new mongoose.Schema({
  identificador: {
    type: String,
    required: true,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
  dataAtualizacao: {
    type: Date,
    default: Date.now,
  },
  usuarioEmail: {
    type: String,
    required: true,
  },
  cpfDevedor: {
    type: String,
    required: true,
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
      status: String,
      entrada: Number,
      aceito: Boolean,
      qtdParcelas: Number,
      valorParcela: Number,
    },
  ],
});

export default mongoose.models.Acordos ||
  mongoose.model("Acordos", AcordoSchema);
