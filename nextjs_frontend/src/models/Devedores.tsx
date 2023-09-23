import mongoose from "mongoose";

export interface Devedor {
  rg: string;
  cpf: string;
  nome: string;
  valorDivida: number;
  mensalidadesAtrasadas: number;
  emailAdministrador: string;
}

const DevedorSchema = new mongoose.Schema({
  rg: String,
  cpf: String,
  nome: String,
  valorDivida: Number,
  mensalidadesAtrasadas: Number,
  emailAdministrador: String,
});

export default mongoose.models.Devedores ||
  mongoose.model("Devedores", DevedorSchema);
