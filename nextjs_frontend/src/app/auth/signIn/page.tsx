// pages/auth/signIn.js
"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SignIn = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    // if (!result.error) {
    //   router.push("/dashboard"); // Redirect to the dashboard or any other page on successful sign-in
    // }
  };

  return (
    // <div>
    //   <h2>Sign In</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="email">Email</label>
    //       <input type="text" id="email" name="email" required />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password</label>
    //       <input type="password" id="password" name="password" required />
    //     </div>
    //     <button type="submit">Sign In</button>
    //   </form>
    // </div>
    <div className="flex flex-wrap w-full h-full">
      <div className="bg-[#d9d9d9] flex items-center justify-center w-full md:w-1/2 ">
        <div className="w-48 lg:w-96">
          <h1 className="text-3xl font-medium leading-10 md:text-6xl">
            Lorem ipsum dolor sit amet.{" "}
          </h1>
          <h3 className="font-medium md:text-2xl">
            Crie uma conta e comece a usar nosso serviço
          </h3>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center md:w-1/2 bg-tertiary">
        <Image
          className="dark:invert"
          alt="brain analysis icon"
          src="/reco.svg"
          width={180}
          height={180}
          priority
        />
        <form className="w-4/6 ">
          <h3 className="text-center font-medium mb-5 md:text-2xl">
            Olá! que bom te ver de novo.
          </h3>
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            className="w-full p-2 mb-4 border border-gray-300 shadow rounded-md h-12 hover:border-gray-400"
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu email"
          />
          <label htmlFor="password" className="font-medium">
            Senha
          </label>
          <input
            className="w-full p-2 mb-4 border border-gray-300 shadow rounded-md h-12 hover:border-gray-400"
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
          />
          <div className="flex ">
            <input
              type="checkbox"
              id="rememberMe"
              className="shadow hover:border-gray-400 md:h-5 md:w-5"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 text-gray-700 text-sm pt-[2px]"
            >
              Lembre de mim
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
