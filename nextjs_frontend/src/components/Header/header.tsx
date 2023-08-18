import Image from 'next/image'

export default function Header() {
    return (
        <div className='flex justify-around border-b border-gray-300 p-6'>
            <span className='flex place-items-center gap-8 font-medium'>
                <Image
                    src="/logo.svg"
                    alt="Reco Logo"
                    width={100}
                    height={24}
                    priority
                />
                <a href="/">
                    Página Inicial
                </a>
                <a href="/config/">
                    Configurações
                </a>
            </span>
            <span className='flex place-items-center gap-2 font-medium'>
                <Image
                    src="/icons/logout.svg"
                    className="dark:invert"
                    alt="Logout Logo"
                    width={24}
                    height={24}
                />
                <button className="underline">
                    Sair
                </button>
            </span>
        </div>
    )
}