import mongoose from "mongoose";

export interface Acordos {
  id: number;
  valor: number;
  dataAcordo: Date;
  diaPagamento: Date;
  qtdParcelas: number;
  juros: number;
  status: string;
  usuarioEmail: string;
  devedorCpf: string;
  descricao: string;
}

const AcordoSchema = new mongoose.Schema({
  id: Number,
  valor: Number,
  dataAcordo: Date,
  diaPagamento: Date,
  qtdParcelas: Number,
  juros: Number,
  status: String,
  usuarioEmail: String,
  devedorCpf: String,
  descricao: String,
});

export default mongoose.models.Bot || mongoose.model("Acordos", AcordoSchema);
