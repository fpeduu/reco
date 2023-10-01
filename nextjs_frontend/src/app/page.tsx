"use client";

import Image from "next/image";
import Styles from "./landing.module.scss";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PricingCard from "./components/PricingCard/pricing-card";
import DepositionCard from "./components/DepositionCard/deposition-card";
import FeatureCard from "./components/FeatureCard/feature-card";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      router.push("/tenants");
    }
  }, [session]);

  return (
    <div className="w-full max-h-fit flex flex-col">
      {/* HOME SECTION */}
      <section
        id="home"
        className="w-full md:h-232 px-10 md:px-20 bg-neutral-950 flex items-center lg:bg-origin-content lg:bg-[url(/images/some_guy.png)] bg-no-repeat md:bg-right bg-cover "
      >
        <div className="w-full h-full py-48 text-neutral-200 flex flex-col gap-4 mb-4 items-center lg:items-start">
          <h1 className="text-4xl max-w-xl lg:max-w-2xl md:text-7xl font-medium">
            A autonomia que sua administradora precisa!
          </h1>
          <p className="max-w-xl tracking-wider leading-7 font-extralight text-justify">
            Potencialize o sucesso e rapidez dos seus acordos de inadimplência!
            Somos um serviço especializado em intermediar acordos extrajudiciais
            de cobranças condominiais de forma ágil e eficiente.
          </p>
          <button className="mt-10 bg-primary rounded-full w-[252px] h-12 font-medium">
            Junte-se à Reco
          </button>
        </div>
      </section>
      {/* FEATURES SECTION*/}
      <section
        id="features"
        className="w-full max-h-fit bg-neutral-200 relative"
      >
        <div className="w-full h-208 absolute right-0 -top-96 lg:bg-[url(/images/grafismo3.svg)] lg:bg-[length:730px_700px] bg-right-top bg-[w-32] bg-no-repeat bg-contain " />
        <div className="flex justify-center p-20 mt-24 mb-20">
          <div className="flex flex-wrap justify-center  gap-12 my-10">
            <div>
              <Image
                alt="reco logo"
                src="/logo.svg"
                width={400}
                height={100}
                priority
              />
              <h2 className="text-5xl md:text-6xl md:min-w-[500px] text-end font-extralight pr-4">
                te oferece:
              </h2>
            </div>
            <FeatureCard
              image="/icons/brain_analysis.svg"
              title="Análises avançadas"
              description="Nossa Inteligência Artificial fornece as melhores propostas às suas negociações."
            />
            <FeatureCard
              image="/icons/laptop_autom.svg"
              title="Automatização"
              description="Todo o processo é automático e programado para sua satisfação."
            />
            <FeatureCard
              image="/icons/security.png"
              title="Sistema seguro"
              description="Tranquilize-se! Seus dados estarão bem seguros e armazenados."
            />
          </div>
        </div>
      </section>
      {/* SECTION USER GUIDE */}
      <section id="userGuide" className="w-full max-h-fit bg-neutral-200 ">
        <div className="flex flex-col items-center p-16 mb-20">
          <h2 className="text-7xl font-medium">Como funciona?</h2>
          <div className="flex flex-col gap-5 mt-5 md:flex-row lg:gap-10 ">
            <div className={Styles.userGuideStep}>
              <div>1</div>

              <p>
                Escolha o inadimplente com quem deseja realizar uma negociação
              </p>
            </div>
            <div className="relative top-12 right-12 hidden md:block lg:right-[105px] md:top-16">
              <div className={`${Styles.horizontalLine} `}></div>
            </div>
            <div className="relative left-[55%] w-8 md:hidden">
              <div className={Styles.verticalLine}></div>
            </div>
            <div className={Styles.userGuideStep}>
              <div>2</div>
              <p>
                Aguarde nossa tecnologia gerar as melhores propostas para seu
                acordo
              </p>
            </div>
            <div className="relative top-12 right-12 hidden md:block lg:right-[105px] md:top-16">
              <div className={Styles.horizontalLine}></div>
            </div>
            <div className="relative left-[55%] w-8 md:hidden">
              <div className={Styles.verticalLine}></div>
            </div>
            <div className={Styles.userGuideStep}>
              <div>3</div>
              <p>
                Verifique a proposta <br />e conclua a negociação{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION DEPOSITIONS */}
      <section
        id="depositions"
        className="w-full max-h-fit bg-neutral-950 bg-[url(/images/grafismo2.svg)] bg-no-repeat bg-left-bottom bg-origin-border"
      >
        <div className="flex flex-col items-center gap-10 p-16 text-neutral-200">
          <h2 className="text-7xl font-medium">
            O que nossos clientes estão dizendo?
          </h2>
          <p className="py-3 px-8 font-light text-center rounded-3xl bg-primary">
            Veja o que alguns de nossos clientes estão comentando sobre suas
            experiências na Reco.
          </p>
          <div className="flex flex-wrap justify-center mt-16 gap-16 lg:gap-6">
            <DepositionCard
              name="Jéssica Lima"
              role="Gerente financeira da SEMOG"
              text="A Reco aumentou a produtividade do setor de cobranças da SEMOG. Conseguimos fechar muitos acordos em menos tempo."
              image="/images/castiel.jpg"
            />
            <DepositionCard
              name="Castiel Veilmont"
              role="Gerente financeira da SEMOG"
              text="A Reco aumentou a produtividade do setor de cobranças da SEMOG. Conseguimos fechar muitos acordos em menos tempo."
              image="/images/castiel.jpg"
            />
            <DepositionCard
              name="Lilian Oliveira"
              role="Gerente financeira da SEMOG"
              text="A Reco aumentou a produtividade do setor de cobranças da SEMOG. Conseguimos fechar muitos acordos em menos tempo."
              image="/images/castiel.jpg"
            />
          </div>
        </div>
      </section>
      {/* PRICING SECTION */}
      <section id="pricing" className="w-full max-h-fit bg-neutral-200">
        <div className="flex flex-wrap items-center justify-center gap-20 px-16 py-32 bg-[url(/images/grafismo1.svg)] bg-no-repeat bg-right-bottom md:bg-right">
          <div className="w-[350px]">
            <h2 className="mb-10 text-7xl text-justify font-medium">Planos</h2>
            <p className="text-justify text-lg text-secondary font-light">
              Conheça os planos da nossa plataforma! <br /> <br />O plano Básico
              é descomplicado, ideal para conhecer a plataforma. Já o plano
              Premium oferece recursos avançados e suporte especializado para
              acordos justos e sustentáveis.
            </p>
            <h4 className="font-medium text-2xl mt-10">Métodos de pagamento</h4>
            <div className="flex flex-wrap gap-5 md:gap-9 mt-4 justify-center md:justify-start">
              <Image
                alt="paypal icon"
                src="/icons/paypal.svg"
                width={35}
                height={35}
                priority
              />
              <Image
                alt="pix icon"
                src="/icons/pix.svg"
                width={40}
                height={40}
                priority
              />
              <Image
                alt="visa icon"
                src="/icons/visa.svg"
                width={50}
                height={50}
                priority
              />
              <Image
                alt="mastercard icon"
                src="/icons/mastercard.svg"
                width={40}
                height={40}
                priority
              />
            </div>
          </div>
          <div className="flex gap-8 flex-wrap justify-center">
            <PricingCard title="Básico" value={789.9} dailyAgreements={10} />
            <PricingCard title="Básico" value={859.9} dailyAgreements={20} />
            <PricingCard title="Básico" value={929.9} dailyAgreements={30} />
          </div>
        </div>
      </section>
    </div>
  );
}
