import mongoose from "mongoose";

export interface Fatura {
  id: number;
  usuarioEmail: string;
  devedorCpf: string;
  dataAcordo?: Date;
  status: string;
  valor: number;
  juros: number;
  diaPagamento: Date;
  qtdParcelas: number;
  descricao: string;
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
  devedorCpf: {
    type: String,
    required: true,
  },
  dataAcordo: {
    type: Date,
    default: Date.now,
  },
  status: String,
  valor: Number,
  juros: Number,
  diaPagamento: Date,
  qtdParcelas: Number,
  descricao: String,
});

export default mongoose.models.Acordos ||
  mongoose.model("Acordos", AcordoSchema);
