import React from "react";
import EditIcon from "@mui/icons-material/Edit";

interface ModalInformationProps {
  title: string;
  value: number;
  installments?: number;
  installmentValue: number;
  showEdit?: boolean;
  onEdit?: () => void;
}

export default function ModalInformation({
  title, value,
  installments,
  installmentValue,
  showEdit = false,
  onEdit = () => {},
}: ModalInformationProps) {

  return (
    <div className="flex flex-col gap-1 p-4 w-full
                  bg-tertiary rounded-md shadow relative">
      <span className="font-normal text-sm">{title}:</span>
      <span className="text-sm font-light md:whitespace-nowrap">
        <b>Entrada:</b>&nbsp;
        R$ {value.toLocaleString("pt-BR")}
        {installments && installments > 0 &&<>
        &nbsp;+&nbsp;{installments}x
        de R$ {installmentValue.toLocaleString("pt-BR")}</>}
      </span>

      {showEdit && (
        <EditIcon
          className="absolute top-2 right-2 px-2 py-1 cursor-pointer"
          sx={{ fontSize: "2rem" }}
          onClick={onEdit}
        />
      )}
    </div>
  );
}
