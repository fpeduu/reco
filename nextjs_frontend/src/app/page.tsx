import Image from "next/image";

export default function Home() {
  return (
    // <div className="flex m-auto place-items-center">
    //   <Image
    //     className="dark:invert"
    //     alt="Reco Logo"
    //     src="/reco.svg"
    //     width={700}
    //     height={700}
    //     priority
    //   />
    // </div>
    <section id="home" className="w-full max-h-fit bg-secondary">
      <div className="text-tertiary p-16 flex flex-col gap-4 mb-4">
        <h1 className="text-7xl">Boas-vindas à Reco!</h1>
        <p className="max-w-2xl tracking-wider leading-7">
          É um prazer te ter conosco! Somos um serviço especializado em
          intermediar acordos extrajudiciais de cobranças condominiais de forma
          ágil e eficiente. Nossa plataforma foi projetada para atender às
          necessidades de administradoras, conselheiros fiscais, síndicos e
          condôminos, oferecendo uma abordagem inovadora e focada na resolução
          pacífica de conflitos.
        </p>
        <button className="bg-primary rounded-full max-w-[252px] h-12">
          Junte-se à Reco
        </button>
      </div>
    </section>
  );
}
