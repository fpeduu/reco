import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

interface ModalInformationProps {
  title: string;
  value: number;
  installments?: number;
  installmentValue: number;
  editable?: boolean;
  setValues?: (value: number, parcelas: number) => boolean;
}

export default function ModalInformation({
  title,
  value,
  installments,
  installmentValue,
  editable = false,
  setValues = () => false,
}: ModalInformationProps) {
  const [entry, setEntry] = useState<number>(value);
  const [parcels, setParcels] = useState<number>(installments || 0);
  const [editing, setEditing] = useState<boolean>(false);

  const handleEdit = () => {
    if (setValues(entry, parcels)) setEditing(false);
  };

  return (
    <div
      className="flex flex-col gap-1 p-4 w-full
                 bg-tertiary rounded-md shadow relative"
    >
      <span className="font-normal text-sm">{title}:</span>
      <span className="text-sm font-light md:whitespace-nowrap">
        <b>Entrada:</b> R${" "}
        {editing ? (
          <input
            type="number"
            name="entry-input"
            id="entry-input"
            className="w-[3rem] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={entry}
            onChange={(e) => setEntry(Number(e.target.value))}
            min="0"
          />
        ) : (
          value.toLocaleString("pt-BR")
        )}{" "}
        |&nbsp;
        {editing ? (
          <input
            type="number"
            name="parcels-input"
            id="parcels-input"
            className="w-[2rem] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={parcels || 0}
            onChange={(e) => setParcels(Number(e.target.value))}
            min="0"
          />
        ) : (
          installments
        )}{" "}
        parcelas de R$ {installmentValue.toLocaleString("pt-BR")}
      </span>

      {editable &&
        (!editing ? (
          <EditIcon
            className="absolute top-2 right-2 px-2 py-1 cursor-pointer"
            sx={{ fontSize: "2rem" }}
            onClick={() => setEditing(true)}
          />
        ) : (
          <button
            className="absolute top-2 right-2 px-2 py-1 bg-secondary text-tertiary rounded"
            onClick={handleEdit}
          >
            Ok
          </button>
        ))}
    </div>
  );
}
