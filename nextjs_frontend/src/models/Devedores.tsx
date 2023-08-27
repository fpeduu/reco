import mongoose from "mongoose";

export interface Devedor {
  cpf: string;
  nome: string;
  mensalidadesAtrasadas: number;
  condominioCnpj: string;
}

export interface Condomino extends Devedor {
  nomeCondominio: string;
}

const DevedorSchema = new mongoose.Schema({
  cpf: String,
  nome: String,
  mensalidadesAtrasadas: Number,
  condominioCnpj: String,
});

export default mongoose.models.Devedores ||
               mongoose.model("Devedores", DevedorSchema);
