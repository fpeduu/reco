import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex m-auto place-items-center">
      <Image
        className="dark:invert"
        alt="Reco Logo"
        src="/reco.svg"
        width={700}
        height={700}
        priority
      />
    </div>
  )
}
