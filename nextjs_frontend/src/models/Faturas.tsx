import mongoose from "mongoose";

export interface Fatura {
  codigo: number;
  devedorCpf: string;
  valor: number;
  dataVencimento: Date;
  dataPagamento: Date;
}

const FaturaSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: true,
  },
  devedorCpf: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  dataVencimento: {
    type: Date,
    required: true,
  },
  dataPagamento: {
    type: Date,
    required: false,
  },
});

export default mongoose.models.Faturas ||
  mongoose.model("Faturas", FaturaSchema);
