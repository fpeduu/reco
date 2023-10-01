interface AgreementDecisionProps {
  onAcceptAgreement: () => void;
  onRejectAgreement: () => void;
}

export default function AgreementDecision({
  onAcceptAgreement,
  onRejectAgreement,
}: AgreementDecisionProps) {
  return (
    <div className="flex gap-2">
      <button
        className="font-semibold py-4 px-6 text-center
                bg-red-100 text-red-500 rounded-lg shadow
                hover:bg-red-200 hover:text-primary"
        onClick={onRejectAgreement}
      >
        Rejeitar acordo
      </button>
      <button
        className="font-semibold py-4 px-6 text-center
                bg-green-100 text-emerald-700 rounded-lg shadow
                hover:bg-green-200 hover:text-emerald-800"
        onClick={onAcceptAgreement}
      >
        Aceitar acordo
      </button>
    </div>
  );
}
