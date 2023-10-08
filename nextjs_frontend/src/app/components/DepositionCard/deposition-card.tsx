import Image from "next/image";

interface DepositionCardProps {
  name: string;
  role: string;
  text: string;
  image: string;
}

export default function DepositionCard({
  name,
  role,
  text,
  image,
}: DepositionCardProps) {
  return (
    <div className="w-full md:w-[427px] h-fit md:h-56 p-8 flex flex-col items-center justify-center text-neutral-950 bg-neutral-200 rounded-2xl shadow-lg">
      <div className="w-[80px] h-[80px] rounded-full bg-white overflow-hidden relative bottom-2 -mt-12">
        <Image
          src={image}
          alt="deposition image"
          width={90}
          height={90}
        />
      </div>
      <h6 className="text-lg text-center font-medium">{name}</h6>
      <p className="text-sm text-center">{role}</p>
      <small className="text-sm text-center font-light italic mt-5 tracking-tight">
        “{text}”
      </small>
    </div>
  );
}
