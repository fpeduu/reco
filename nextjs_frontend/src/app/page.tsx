import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex m-auto place-items-center">
      <Image
        className="dark:invert"
        alt="Next.js Logo"
        src="/next.svg"
        width={180}
        height={37}
        priority
      />
    </div>
  )
}
