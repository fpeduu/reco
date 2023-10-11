interface MessageProps {
  isBot: boolean;
  children: React.ReactNode;
  iteractive?: boolean;
  acceptText?: string;
  denyText?: string;
  onConfirm?: () => void;
  onDeny?: () => void;
}

export default function Message({
  isBot, children, iteractive,
  acceptText = "Aceitar acordo",
  denyText = "Recusar acordo",
  onConfirm, onDeny,
}: MessageProps) {
  const styles = isBot ? "" : "min-[640px]:ml-auto bg-tertiary";

  return (
    <div className={`xl:w-2/5 shadow-md m-7 max-h-fit rounded-xl p-5
                    ${styles} sm:w-4/5`}
    >
      <div className="text-base font-normal">{children}</div>
      {iteractive ? (
        <div className="flex flex-col mt-8">
          Clique na opção que se adequa a sua situação:
          <div className="grid grid-cols-2 w-full mt-2 lg:w-2/3 gap-2">
            <button
              onClick={onConfirm}
              className="bg-primary h-fit p-1 rounded-md min-h-[48px]"
            >
              <p className="text-white"> {acceptText} </p>
            </button>
            <button
              onClick={onDeny}
              className="bg-tertiary h-full rounded-md
                         text-[#545454] p-1 min-h-[48px]"
            >
              {denyText}
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
