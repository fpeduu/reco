import mongoose from "mongoose";

export interface Condominio {
  cnpj: string;
  nome: string;
  address: string;
  valorMensalidade: number;
  administradorEmail: string;
}

const CondominioSchema = new mongoose.Schema({
  cnpj: String,
  nome: String,
  address: String,
  valorMensalidade: Number,
  administradorEmail: String,
});

export default mongoose.models.Condominios ||
               mongoose.model("Condominios", CondominioSchema);
