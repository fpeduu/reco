"use client";

import { useEffect, useState } from "react";
import { UserInputProps } from "./user-input.dto";

export default function UserInput({
  title = "Preencha os campos", confirmText = "Sugerir proposta",
  divida, showReason, containerStyles, onConfirm, onCancel
}: UserInputProps) {
  const [value, setValue] = useState<string>(String(divida));
  const [reason, setReason] = useState<string>("");
  const [installment, setInstallment] = useState<string>("");
  const [installmentValue, setInstallmentValue] = useState<number>(0);

  useEffect(() => {
    let valueNumber = 0,
      installmentNumber = 0;
    if (value !== "") {
      valueNumber = Number(value);
    }
    if (installment !== "") {
      installmentNumber = Number(installment);
    }
    if (installmentNumber > 0) {
      setInstallmentValue((divida - valueNumber) / installmentNumber);
    }
  }, [value, installment, divida, setInstallmentValue]);

  function onSubmit(event: any) {
    event.preventDefault();
    let installments = Number(installment);
    if (divida - Number(value) === 0) {
      installments = 0;
    }
    onConfirm({
      value: Number(value),
      reason, installment: installments
    });
  }

  function onValueChange(event: any) {
    let value = event.target.value;
    if (value >= divida) return;

    if (installment === "" || installment === "0") {
      setInstallment("1");
    }
    setValue(value);
  }

  function onInstallmentChange(event: any) {
    const installment = event.target.value;
    if (installment === "0") {
      setValue(String(divida));
    }
    setInstallment(installment);
  }

  function onReasonChange(event: any) {
    setReason(event.target.value);
  }

  return (
    <div className="w-full p-8 bg-tertiary rounded-md">
      <div
        className={`md:w-2/3 flex flex-col justify-center m-auto gap-4
                   w-full ${containerStyles}`}>
        <p className="font-normal text-2xl">{title}</p>
        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-20">
          <span className="flex flex-col gap-2 flex-1">
            <p className="font-normal text-lg">*Valor de entrada:</p>
            <input
              type="number"
              value={value}
              onChange={onValueChange}
              placeholder="Ex: 1.000,00"
              required
              min="0"
              max={divida}
              className="p-4 rounded-xl shadow-md"
            />
          </span>
          <span className="flex flex-col gap-2 flex-1">
            <p className="font-normal text-lg">*Parcelamento do restante:</p>
            <input
              type="number"
              name="installment"
              id="installment"
              value={installment}
              onChange={onInstallmentChange}
              placeholder="Ex: 3"
              required
              min="0"
              max="60"
              className="p-4 rounded-xl shadow-md w-full"
            />
            {installmentValue > 0 && `de R$ ${installmentValue.toLocaleString("pt-BR")}`}
          </span>
        </div>
        {showReason &&
          <div className="flex flex-col gap-2">
            <p className="font-normal text-lg">Motivo da proposta:</p>
            <input
              type="text"
              name="reason"
              id="reason"
              value={reason}
              onChange={onReasonChange}
              className="p-4 rounded-xl shadow-md"
              placeholder="Digite aqui o motivo do novo acordo"
            />
          </div>
        }
        <div className="flex flex-col justify-end gap-5 mt-4 sm:flex-row">
          {onCancel &&
            <button
              onClick={onCancel} type="submit"
              className="bg-[#808080] rounded-lg px-8 py-2
                         text-white w-44">
              Cancelar
            </button>}
          <button
            onClick={onSubmit} type="submit"
            className="bg-primary rounded-lg w-full md:w-max
                         px-8 py-2 text-white">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
