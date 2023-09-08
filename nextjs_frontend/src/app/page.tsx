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
          <h1 className="text-7xl font-medium">Boas-vindas à Reco!</h1>
          <p className="max-w-2xl tracking-wider leading-7 font-medium">
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
            <h2 className="text-7xl md:text-8xl md:min-w-[550px] font-medium">
              <strong className="text-primary ">reco</strong> <br />
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
      <section id="userGuide" className="w-full max-h-fit bg-tertiary ">
        <div className="flex flex-col items-center p-16 mb-20">
          <h2 className="text-7xl font-medium">Como funciona?</h2>
          <div className="flex flex-col gap-5 mt-5 md:flex-row lg:gap-10 ">
            <div className={Styles.userGuideStep}>
              <div>1</div>

              <p>Escolha o condômino que deseja realizar uma negociação</p>
            </div>
            <div className="relative top-12 right-12 hidden md:block lg:right-[105px] lg:top-10">
              <div className={`${Styles.horizontalLine} `}></div>
            </div>
            <div className="relative left-[50%] md:hidden">
              <div className={Styles.verticalLine}></div>
            </div>
            <div className={Styles.userGuideStep}>
              <div>2</div>
              <p>
                Aguarde nossa tecnologia gerar as melhores propostas para seu
                acordo
              </p>
            </div>
            <div className="relative top-12 right-12 hidden md:block lg:right-[105px] lg:top-10">
              <div className={Styles.horizontalLine}></div>
            </div>
            <div className="relative left-[50%] md:hidden">
              <div className={Styles.verticalLine}></div>
            </div>
            <div className={Styles.userGuideStep}>
              <div>3</div>
              <p>
                Determine a proposta desejada <br /> e feche a negociação
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION DEPOSITIONS */}
      <section id="depositions" className="w-full max-h-fit bg-primary">
        <div className="flex flex-col items-center  p-16 ">
          <h2 className="text-7xl text-tertiary font-medium">
            O que nossos clientes estão dizendo?
          </h2>
          <p className="tracking-wider leading-7  text-center text-tertiary">
            Veja o que alguns de nossos clientes estão comentando sobre suas
            experiências na Reco.
          </p>
          <div className="flex flex-wrap justify-center mt-16 gap-16 lg:gap-6">
            <div className={Styles.depositionCard}>
              <div>
                <Image
                  className=""
                  src="/castiel.jpg"
                  alt="deposition image"
                  width={80}
                  height={80}
                />
              </div>
              <h6>Castiel Veilmont</h6>
              <p>Gerente Financeira da Semog</p>
              <small>
                “A Reco aumentou a produtividade do setor de cobranças da SEMOG.
                Conseguimos fechar muitos acordos em menos tempo.”
              </small>
            </div>
            <div className={Styles.depositionCard}>
              <div>
                <Image
                  className=""
                  src="/castiel.jpg"
                  alt="deposition image"
                  width={80}
                  height={80}
                />
              </div>
              <h6>Castiel Veilmont</h6>
              <p>Gerente Financeira da Semog</p>
              <small>
                “A Reco aumentou a produtividade do setor de cobranças da SEMOG.
                Conseguimos fechar muitos acordos em menos tempo.”
              </small>
            </div>
            <div className={Styles.depositionCard}>
              <div>
                <Image
                  className=""
                  src="/castiel.jpg"
                  alt="deposition image"
                  width={80}
                  height={80}
                />
              </div>
              <h6>Castiel Veilmont</h6>
              <p>Gerente Financeira da Semog</p>
              <small>
                “A Reco aumentou a produtividade do setor de cobranças da SEMOG.
                Conseguimos fechar muitos acordos em menos tempo.”
              </small>
            </div>
          </div>
        </div>
      </section>
      {/* PRICING SECTION */}
      <section id="pricing" className="w-full max-h-fit bg-tertiary ">
        <div className="flex flex-wrap p-16">
          <div className="w-[350px]">
            <h2 className="text-7xl text-justify font-medium">Planos</h2>
            <p className="text-justify text-lg text-secondary font-medium">
              Conheça os planos da nossa plataforma! <br /> <br />O plano Básico
              é descomplicado, ideal para conhecer a plataforma. Já o plano
              Premium oferece recursos avançados e suporte especializado para
              acordos justos e sustentáveis.
            </p>
            <h4 className="font-medium text-2xl mt-5">Métodos de pagamento</h4>
            <div className="flex flex-wrap gap-9 mt-4 justify-center md:justify-start">
              <Image
                className="dark:invert"
                alt="paypal icon"
                src="/icons/paypal.svg"
                width={35}
                height={35}
                priority
              />
              <Image
                className="dark:invert"
                alt="pix icon"
                src="/icons/pix.svg"
                width={40}
                height={40}
                priority
              />
              <Image
                className="dark:invert"
                alt="visa icon"
                src="/icons/visa.svg"
                width={50}
                height={50}
                priority
              />
              <Image
                className="dark:invert"
                alt="mastercard icon"
                src="/icons/mastercard.svg"
                width={40}
                height={40}
                priority
              />
            </div>
          </div>
          <div className={Styles.pricingCard}>
            <h3>Básico</h3>
            <div>
              <h3>
                R$40,00 <small>/ mês</small>
              </h3>
              <ul>
                <li>Acordos limitados;</li>
                <li>xxxxxxxxxxxxx</li>
                <li>xxxxxxxxxxx</li>
                <li>xxxxxxxxxxxxxxxx</li>
              </ul>
              <button>Começar</button>
            </div>
          </div>
          <div className={Styles.pricingCard}>
            <h3>Básico</h3>
            <div>
              <h3>
                R$40,00 <small>/ mês</small>
              </h3>
              <ul>
                <li>Acordos limitados;</li>
                <li>xxxxxxxxxxxxx</li>
                <li>xxxxxxxxxxx</li>
                <li>xxxxxxxxxxxxxxxx</li>
              </ul>
              <button>Começar</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
