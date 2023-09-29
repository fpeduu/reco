import { RegrasProposta } from "@/models/Usuarios";
import { Devedor } from "@/models/Devedores";
import { Proposta, StatusType } from "@/models/Acordos";

export interface NegotiationData extends Devedor {
    rules: RegrasProposta;
    proposals: Proposta[];
    status: StatusType;
    contact: string;
}