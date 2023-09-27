interface GenericMessageProps {
  name: string,
  contact?: string
}

interface AcceptProposalProps {
  value: number;
  installment: number;
}

export function AcceptProposal({
  value, installment
}: AcceptProposalProps) {
  return (
    <div>
      <p className="font-normal text-[#2CD087] text-lg my-5">
        Proposta aceita!
      </p>
      <p><b>Detalhes:</b></p>
      <p className="font-light text-base">
        <span className="font-normal">
          Valor de entrada:&nbsp;
        </span>
        R$ {value}
      </p>
      <p className="font-light text-base">
        <span className="font-normal">
          Parcelamento:&nbsp;
        </span>
        {installment} vezes
      </p>
    </div>
  )
}

export function WaitForApproval({ name }: GenericMessageProps) {
  return (
    <div className="text-[#F59E0B] font-normal text-lg">
      Agradecemos por compartilhar sua proposta, {name}. Estamos avaliando-a e retornaremos em breve.
    </div>
  )
}

export function ProposalDenied({ name, contact }: GenericMessageProps) {
  return (
    <div className="font-normal text-lg">
      <p className="text-primary">
        A proposta foi recusada.
      </p>
      Sentimos muito, {name}. Infelizmente não podemos oferecer um acordo melhor. Mas não se preocupe, você ainda pode entrar em contato conosco para negociar, através do seguinte número: {contact}.
    </div>
  )
}