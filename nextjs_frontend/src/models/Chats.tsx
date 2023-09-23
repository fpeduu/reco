import mongoose from "mongoose";

export type StatusType =
  | "Aguardando inadimplente"
  | "Conversa iniciada"
  | "Valor reserva alcançado"
  | "Negociação concluída";

export interface Valor {
  entrada: number;
  valorParcela: number;
  numeroParcelas: number;
}

export interface Chat {
  id: number;
  status: StatusType;
  historicoValores: Valor[];
}

const ChatSchema = new mongoose.Schema({
  id: Number,
  status: String,
  historicoValores: [
    { entrada: Number, valorParcela: Number, numeroParcelas: Number },
  ],
});

export default mongoose.models.Chats || mongoose.model("Chats", ChatSchema);
