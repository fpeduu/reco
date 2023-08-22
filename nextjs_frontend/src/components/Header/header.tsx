import Image from 'next/image'

export default function Header() {
    function isAuthenticated() {
        return false;
    }

    return (
        <div className='flex justify-around bg-secondary p-2 h-24 text-tertiary'>
            <span className='flex place-items-center gap-8 font-semibold'>
                <Image
                    src="/logo.svg"
                    alt="Reco Logo"
                    width={150}
                    height={48}
                    priority
                />
                <a href="/">
                    Página Inicial
                </a>
                <a href="/config/">
                    Configurações
                </a>
            </span>
            <span className='flex place-items-center gap-2 font-semibold'>
                {isAuthenticated() ? <>
                    <Image
                        src="/icons/logout.svg"
                        className="invert"
                        alt="Logout Logo"
                        width={24}
                        height={24}
                    />
                    <button className="underline">
                        Sair
                    </button>
                </>:<>
                    <button className="underline">
                        Entrar
                    </button>
                    <button className="bg-primary rounded-full py-2 px-10 ml-6">
                        Contato
                    </button>
                </>}
            </span>
        </div>
    )
}