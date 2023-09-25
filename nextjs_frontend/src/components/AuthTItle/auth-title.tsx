"use client";

import { useSession } from "next-auth/react";

export default function AuthTitle({ subtitle }: { subtitle?: string }) {
  const { data: session } = useSession({ required: true });

  return (
    <div className="my-10">
      <h1 className="text-4xl font-bold leading-10">
        Olá, {session?.user?.name}!
      </h1>
      {subtitle && (
        <h2 className="text-lg font-light leading-10">{subtitle}</h2>
      )}
    </div>
  );
}
