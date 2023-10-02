import Image from "next/image";

export default function LoadingBar() {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center">
      <Image src="/logo.svg" alt="logo" width={125} height={31} /> Carregando...
    </div>
  );
}
