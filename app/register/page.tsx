"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SpinnerClient from "@/components/common/SpinnerClient";
import Title from "@/components/common/Title";

const RegisterPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (response.status === 201) {
        console.log("Registered:", data);
        alert("Registration successful");
        router.push("/login");
      }
    } catch (error: any) {
      // alert(error.message);
      console.log("Failed to register:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SpinnerClient />;
  }

  return (
    <section className="max-w-[800px] mx-auto mt-8 px-16 mb-14 ">
      <Title>REGISTER</Title>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="form_label">
            Username
          </label>
          <input
            className="form_input mb-10 bg-neutral-900 border-lg border-slate-200 border-2 rounded-md text-white tracking-wider"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label className="form_label" htmlFor="email">
            Email
          </label>
          <input
            className="form_input mb-10 bg-neutral-900 border-lg border-slate-200 border-2 rounded-md text-white tracking-wider"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label className="form_label" htmlFor="password">
            Password
          </label>
          <input
            className="form_input bg-neutral-900 border-lg border-slate-200 border-2 rounded-md text-white tracking-wider"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          className="block mx-auto mt-12 p-3 w-[50%] bg-slate-950 border-lg text-2xl tracing-wider
          border-slate-500 border-2  rounded-md hover:opacity-80 hover:translate-y-0.5 transition duration-800 ease-in-out
          max-[640px]:text-[1.3rem] max-[480px]:text-[1.2rem]  "
        >
          REGISTER
        </button>
      </form>

      <Link
        href="/login"
        className="block text-blue-50 underline w-[fit-content] mt-[7rem] text-2xl 
        hover:scale-110 transform transition duration-300 ease-in-out
        max-[480px]:mb-8  "
      >
        Already have an account?{" "}
      </Link>
    </section>
  );
};

export default RegisterPage;
