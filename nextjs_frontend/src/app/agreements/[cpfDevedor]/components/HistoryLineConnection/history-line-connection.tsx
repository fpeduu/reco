import Image from "next/image";

interface HistoryLineConnectionProps {
  accepted: boolean | null;
  connect: boolean;
}

export default function HistoryLineConnection({ accepted, connect }: HistoryLineConnectionProps) {
  return (
    <div className="flex flex-col items-center">
      {accepted !== null ? (
        <Image
          src={accepted ? "/icons/check_circle_green.svg" : "/icons/error_circle.svg"}
          alt="icon"
          width={43}
          height={43}
        />
      ) : (
        <Image src="/icons/check_circle.svg" alt="icon" width={43} height={43} />
      )}
      {connect && (
        <div className="my-2 flex flex-col items-center">
          <div className="w-0 h-14 border-l border-l-neutral-400" />
          <div className="w-3 h-3 mb-1 bg-neutral-400 rounded-full" />
          <div className="w-0 h-14 border-l border-l-neutral-400" />
        </div>
      )}
    </div>
  );
}
