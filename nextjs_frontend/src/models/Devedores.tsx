import mongoose from "mongoose";

export interface Devedor {
  cpf: string;
  nome: string;
  valorDivida: number;
  nomeCondominio: string;
  emailAdministrador: string;
  mensalidadesAtrasadas: number;
}

const DevedorSchema = new mongoose.Schema({
  cpf: String,
  nome: String,
  valorDivida: Number,
  nomeCondominio: String,
  emailAdministrador: String,
  mensalidadesAtrasadas: Number,
});

export default mongoose.models.Devedores ||
  mongoose.model("Devedores", DevedorSchema);
