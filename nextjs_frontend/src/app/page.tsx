import Image from "next/image";
import Styles from "./landing.module.scss";

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
    <div className="flex flex-col w-full max-h-fit">
      <section id="home" className="w-full max-h-fit bg-secondary">
        <div className="text-tertiary p-16 flex flex-col gap-4 mb-4 items-center lg:items-start">
          <h1 className="text-7xl">Boas-vindas à Reco!</h1>
          <p className="max-w-2xl tracking-wider leading-7">
            É um prazer te ter conosco! Somos um serviço especializado em
            intermediar acordos extrajudiciais de cobranças condominiais de
            forma ágil e eficiente. Nossa plataforma foi projetada para atender
            às necessidades de administradoras, conselheiros fiscais, síndicos e
            condôminos, oferecendo uma abordagem inovadora e focada na resolução
            pacífica de conflitos.
          </p>
          <button className="bg-primary rounded-full w-[252px] h-12">
            Junte-se à Reco
          </button>
        </div>
      </section>
      {/* SECTION Features*/}
      <section id="features" className="w-full max-h-fit bg-tertiary">
        <div className="flex p-20 ">
          <div className="flex flex-wrap gap-5 items-center justify-center my-10">
            <h2 className="text-7xl md:text-8xl md:min-w-[550px]">
              <strong className="text-primary">reco</strong> <br />
              te oferece:
            </h2>
            <div className={Styles.featureCard}>
              <Image
                className="dark:invert"
                alt="brain analysis icon"
                src="/icons/brain_analysis.svg"
                width={80}
                height={80}
                priority
              />
              <div>
                <h5>Análises avançadas</h5>
                <p>
                  Nossa Inteligência Artificial fornece as melhores propostas às
                  suas negociações.
                </p>
              </div>
            </div>
            <div className={Styles.featureCard}>
              <Image
                className="dark:invert"
                alt="laptopicon"
                src="/icons/laptop_autom.svg"
                width={80}
                height={80}
                priority
              />
              <div>
                <h5>Automatização</h5>
                <p>
                  Todo o processo é automático e programado para sua satisfação.
                </p>
              </div>
            </div>
            <div className={Styles.featureCard}>
              <Image
                className="dark:invert"
                alt="security icon"
                src="/icons/security.png"
                width={70}
                height={70}
                priority
              />
              <div>
                <h5>Sistema Seguro</h5>
                <p>
                  Tranquilize-se! Seus dados estarão bem seguros e armazenados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION USER GUIDE */}
      <section id="userGuide" className="w-full max-h-fit bg-tertiary">
        <div className="flex flex-col items-center m-16">
          <h1 className="text-7xl">Como funciona?</h1>
          <div>
            <div>
              <div className="rounded-full text-tertiary bg-primary">1</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
