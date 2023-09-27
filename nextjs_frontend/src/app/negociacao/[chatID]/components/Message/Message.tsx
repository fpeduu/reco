interface MessageProps {
  isBot: boolean;
  children: React.ReactNode;
  iteractive?: boolean;
  onConfirm?: () => void;
  onDeny?: () => void;
}

export default function Message({
  isBot, children, iteractive, onConfirm, onDeny
}: MessageProps) {
  const styles = isBot ? "" : "ml-auto bg-tertiary"

  return (
    <div className={`w-2/5 shadow-md m-7 max-h-fit rounded-xl p-5 ${styles}`}>
      <div className="text-base font-normal">
        {children}
      </div>
      {iteractive ?
        <div className="flex flex-col mt-8">
          Clique na opção que se adequa a sua situação:
          <div className="flex w-2/3 gap-2 mt-2">
            <button onClick={onConfirm}
              className="bg-primary h-10 rounded-md flex-1 text-white">
              Aceitar acordo
            </button>
            <button onClick={onDeny}
              className="bg-tertiary h-10 rounded-md flex-1 text-[#545454]">
              Recusar acordo
            </button>
          </div>
        </div>
        : <></>}
    </div>
  )
}
