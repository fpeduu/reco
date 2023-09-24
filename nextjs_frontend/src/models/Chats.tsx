import mongoose from "mongoose";

export type StatusType =
  | "Aguardando inadimplente"
  | "Conversa iniciada"
  | "Primeira proposta realizada"
  | "Segunda proposta realizada"
  | "Terceira proposta realizada"
  | "Aguardando confirmação da proposta"
  | "Acordo realizado"
  | "Acordo rejeitado";

export interface Proposta {
  entrada: number;
  valorParcela: number;
  qtdParcelas: number;
}

export interface Chat {
  status: StatusType;
  cpfDevedor: string;
  historicoValores: Proposta[];
}

const ChatSchema = new mongoose.Schema({
  status: String,
  cpfDevedor: String,
  historicoValores: [
    { entrada: Number, valorParcela: Number, qtdParcelas: Number },
  ],
});

export default mongoose.models.Chats || mongoose.model("Chats", ChatSchema);
