"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      router.push("/tenants");
    }
  }, [session]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      redirect: true,
      email,
      password,
    });

    if (!result?.error) {
      router.push("/tenants");
    }
  };

  return (
    <div className="flex flex-wrap w-full h-full">
      <div className="bg-[#d9d9d9] flex items-center justify-center w-full md:w-1/2 ">
        <div className="w-48 lg:w-96">
          <h1 className="text-3xl font-medium leading-10 md:text-6xl">
            Acessar o sistema
          </h1>
          <h3 className="font-medium text-xl md:text-2xl">
            Entre na sua conta e comece a utilizar a usar nosso serviço
          </h3>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center h-full items-center md:w-1/2 bg-tertiary">
        <form className="w-4/6" onSubmit={handleSubmit}>
          <h3 className="text-center font-medium mb-5 text-xl md:text-2xl">
            Olá! que bom te ver de novo!
          </h3>
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            className="w-full p-2 mb-5 border border-gray-300 shadow rounded-md h-12 hover:border-gray-400"
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu email"
          />
          <label htmlFor="password" className="font-medium">
            Senha
          </label>
          <input
            className="w-full p-2 mb-5 border border-gray-300 shadow rounded-md h-12 hover:border-gray-400"
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
          />
          <div className="flex flex-wrap gap-1 md:gap-0">
            <div className="md:w-1/2 flex ">
              <input
                type="checkbox"
                id="rememberMe"
                className="shadow hover:border-gray-400 md:h-5 md:w-5"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm font-medium pt-[2px]"
              >
                Lembre de mim
              </label>
            </div>
            <div className="md:w-1/2 flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm font-medium hover:underline pt-[2px]"
              >
                Esqueci minha senha
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-white font-medium rounded-md h-12 hover:text-gray-300 mt-8"
          >
            Login
          </button>
          <Link
            href="#"
            className="flex justify-center text-sm font-medium hover:underline mt-8 mb-20 pt-[2px]"
          >
            Não tem nenhuma conta ainda? Entre em contato!
          </Link>
        </form>
      </div>
    </div>
  );
};
