import Link from "next/link";
// components
import LoginForm from "@/components/features/Login/LoginForm";
import LoginProviders from "@/components/common/LoginProviders";
import Title from "@/components/common/Title";

import { Suspense } from "react";

const LoginPage = () => {
  return (
    <section className="max-w-[800px] mx-auto mt-8 px-8 flex flex-col items-center min-h-screen">
      <Title>LOGIN</Title>
      <LoginForm />
      <Suspense fallback={<h1 className="text-white">Loading...</h1>}>
        <LoginProviders />
      </Suspense>
      <Link
        href="/register"
        className="block text-blue-50 underline w-[fit-content] mt-10 text-2xl 
        hover:scale-110 transform transition duration-300 ease-in-out
        max-[480px]:mb-8 "
      >
        Create an account here
      </Link>
    </section>
  );
};

export default LoginPage;
