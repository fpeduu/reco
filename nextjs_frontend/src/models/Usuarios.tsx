import mongoose from "mongoose";

export interface Usuario {
  nome: string;
  email: string;
  password: string;
}

const UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  password: String,
});

export default mongoose.models.Usuarios ||
  mongoose.model("Usuarios", UsuarioSchema);
