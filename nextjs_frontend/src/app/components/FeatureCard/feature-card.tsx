import Image from "next/image";

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
}

export default function FeatureCard({
  image,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="md:w-96 p-6 z-10 flex items-center flex-wrap md:flex-nowrap justify-center gap-5 bg-neutral-950 rounded-2xl shadow-md  md:divide-x text-neutral-200 md:min-w-[500px] min-h-[150px] md:h-[150px] md:justify-start">
      <Image alt="feature icon" src={image} width={80} height={80} priority />
      <div className="flex flex-col gap-2 px-5 text-center divide-y md:divide-y-0 md:text-start">
        <h5 className="text-2xl font-medium">{title}</h5>
        <p className="text-[13px] leading-6 font-light">{description}</p>
      </div>
    </div>
  );
}
