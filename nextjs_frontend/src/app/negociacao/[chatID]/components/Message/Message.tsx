interface MessageProps {
  message: string;
  isBot: boolean;
}

export default function Message({ message, isBot }: MessageProps) {
  const styles = isBot ? "" : "ml-auto bg-tertiary"
  const name = isBot ? "Reco Bot" : "Você"

  return (
    <div className={`w-2/5 shadow-md m-7 max-h-fit rounded-xl p-5 ${styles}`}>
      <p className="text-lg font-semibold">
        {name}
      </p>
      <p className="text-base font-normal">
        {message}
      </p>
    </div>
  )
}