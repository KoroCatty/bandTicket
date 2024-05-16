"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SpinnerClient from "@/components/common/SpinnerClient";

const LoginForms = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInData, setLoggedInData] = useState({} as any);
  const [loading, setLoading] = useState(false);

  //! LOGIN
  const handleLogin = async (event: FormEvent) => {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        toast.error("Failed to login");
        throw new Error("Network response was not ok ❌");
      }

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setLoggedInData(data);
        alert(`You logged in as ${data.username}さん`);
        window.location.reload();
      }
      router.push("/");
      // window.location.reload();
    } catch (error) {
      console.log("Failed to fetch data:", error);
      toast.error("Failed to login");
    } finally {
      setLoading(false);
    }
  };

  //! GUEST LOGIN
  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "guest@email.com", password: "1111" }),
      });
      const data = await response.json();

      if (response.ok) {
        setLoggedInData(data);
        alert("Welcome Guest User!!");
        window.location.reload();
      } else {
        // Handle errors for guest login
        console.log("Failed to login as guest:", data.message);
        toast.error("Failed to login as guest");
      }
    } catch (error) {
      console.log("Failed to login as guest:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <SpinnerClient />;

  return (
    <div className="my-6">
      <form onSubmit={handleLogin}>
        <input
          className="form_input mb-10 bg-neutral-900  border-lg border-slate-200 border-2 rounded-md text-white tracking-wider"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="form_input bg-neutral-900 border-lg border-slate-200 border-2 rounded-md text-white tracking-wider"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="submit"
          className="block mx-auto mt-12 p-3 w-[50%] bg-slate-950 border-lg text-2xl tracing-wider
          border-slate-500 border-2  rounded-md hover:opacity-80 hover:translate-y-0.5 transition duration-800 ease-in-out
          max-[640px]:text-[1.3rem] max-[480px]:text-[1.2rem]  "
        >
          LOGIN
        </button>
      </form>
      <div className="text-center text-[1.4rem] my-4">OR</div>

      {/* GUEST ADMIN LOGIN BUTTON */}
      <button
        onClick={handleGuestLogin}
        className="relative left-[50%] -translate-x-[50%] text-[1.5rem]  inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
      max-[640px]:text-[1.3rem] max-[480px]:text-[1.2rem] "
      >
        <span className="relative px-10 py-3.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0  ">
          Guest Admin Login
        </span>
      </button>
    </div>
  );
};

export default LoginForms;
