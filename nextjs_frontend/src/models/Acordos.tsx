import mongoose from "mongoose";

export type StatusType =
  | "Aguardando inadimplente"
  | "Conversa iniciada"
  | "Valor reserva alcançado"
  | "Negociação concluída";

export interface Acordo {
  usuarioEmail: string;
  cpfDevedor: string;
  dataAcordo?: Date;
  entrada: number;
  valorTotal: number;
  qtdParcelas: number;
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
  entrada: Number,
  valorTotal: Number,
  qtdParcelas: Number,
});

export default mongoose.models.Acordos ||
  mongoose.model("Acordos", AcordoSchema);
