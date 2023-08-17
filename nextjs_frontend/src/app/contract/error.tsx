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

  function handleTryAgain() {
    reset()
  }
 
  return (
    <div>
      <h2> Algo deu errado! </h2>
      <button
        className="underline"
        onClick={handleTryAgain}
      >
        Tentar novamente
      </button>
    </div>
  )
}