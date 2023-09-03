'use client'
 
import { useEffect } from 'react'
 
interface ErrorProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="containerLayout">
      <div
        className="w-7/12 px-10 flex flex-col justify-between
                    gap-10 text-lg font-medium">
        <h1 className="text-4xl font-bold">Ops!</h1>
        <p>
          <span className="font-extrabold">Não encontramos&nbsp;</span>
          nenhuma proposta com esse CPF.
        </p>
        <p className="text-justify">
          Verifique se você digitou o CPF corretamente e tente novamente.
          Caso você tenha certeza que o CPF está correto, entre em contato
          com o síndico do seu condomínio para verificar se a proposta foi
          gerada.
        </p>
        <button
          className="w-60 px-10 py-5 rounded-full bg-red-600
                  text-white text-center font-semibold"
          onClick={reset}>
          Tente novamente
        </button>
      </div>
    </div>
  )
}