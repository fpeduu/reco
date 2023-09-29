"use client";

import { useEffect, useState } from "react";
import { UserInputProps } from "../../types/views.dto";

export default function UserInput({ divida, onConfirm }: UserInputProps) {
  const [value, setValue] = useState<string>(String(divida));
  const [reason, setReason] = useState<string>("");
  const [installment, setInstallment] = useState<string>("");
  const [installmentValue, setInstallmentValue] = useState<number>(0);

  useEffect(() => {
    let valueNumber = 0, installmentNumber = 0;
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
    onConfirm({
      value: Number(value), reason,
      installment: Number(installment),
    });
  }

  function onValueChange(event: any) {
    let value = event.target.value;
    if (value >= divida) {
      value = divida;
      setInstallment("0");
    } else if (installment === "" || installment === "0") {
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
    <div className="w-full p-8 bg-tertiary">
      <div className="w-2/3 flex flex-col justify-center m-auto gap-4
                      sm:w-full">
        <p className="font-normal text-2xl">
          Preencha os campos
        </p>
        <div className="flex justify-between gap-20">
          <span className="flex flex-col gap-2 flex-1">
            <p className="font-normal text-lg">
              *Valor de entrada:
            </p>
            <input type="number" value={value} onChange={onValueChange}
                   placeholder="ex: 1.000,00" required min="0" max={divida}
                   className="p-4 rounded-xl shadow-md"/>
          </span>
          <span className="flex flex-col gap-2 flex-1">
            <p className="font-normal text-lg">
              *Parcelamento do restante:
            </p>
            <input type="number" name="installment" id="installment"
                   value={installment} onChange={onInstallmentChange}
                   placeholder="ex: 3" required min="0" max="60"
                   className="p-4 rounded-xl shadow-md w-full"/>
            {installmentValue > 0 &&
            `de R$ ${installmentValue.toLocaleString("pt-BR")}`}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-normal text-lg">
            Motivo da proposta:
          </p>
          <input type="text" name="reason" id="reason"
                 value={reason} onChange={onReasonChange}
                 className="p-4 rounded-xl shadow-md"
                 placeholder="Digite aqui o motivo do novo acordo"/>
        </div>
        <button onClick={onSubmit} type="submit"
                className="bg-primary rounded-lg w-max ml-auto
                            px-8 py-2 text-white">
          Sugerir proposta
        </button>
      </div>
    </div>
  )
}