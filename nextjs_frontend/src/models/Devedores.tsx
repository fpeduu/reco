import mongoose from "mongoose";

export interface Devedores {
  cpf: string;
  nome: string;
  mensalidadesAtrasadas: number;
  condominioCnpj: string;
}

const DevedorSchema = new mongoose.Schema({
  cpf: String,
  nome: String,
  mensalidadesAtrasadas: Number,
  condominioCnpj: String,
});

export default mongoose.models.Bot ||
  mongoose.model("Devedores", DevedorSchema);
