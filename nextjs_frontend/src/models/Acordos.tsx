import mongoose from "mongoose";

export type StatusType =
  | "Aguardando inadimplente"
  | "Conversa iniciada"
  | "Valor reserva alcançado"
  | "Negociação concluída";

export interface Acordo {
  id: number;
  usuarioEmail: string;
  cpfDevedor: string;
  dataAcordo?: Date;
  status: StatusType;
  valor: number;
  entrada: number;
  diaPagamento: number;
  qtdParcelas: number;
  descricao: string;
}

export interface AcordoIdentificado extends Acordo {
  nomeDevedor: string;
}

const AcordoSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
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
  valor: Number,
  diaPagamento: Number,
  qtdParcelas: Number,
  descricao: String,
});

export default mongoose.models.Acordos ||
  mongoose.model("Acordos", AcordoSchema);
