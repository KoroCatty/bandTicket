"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoginForms = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInData, setLoggedInData] = useState({} as any);

  //! LOGIN
  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    // console.log('🔥', password)
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
    }
  };

  //! GUEST LOGIN
  const handleGuestLogin = async () => {
    // const response = await fetch("/api/login/guest", {
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
      console.log("Logged in as guest:", data);
      alert("Welcome Guest User!!");
      window.location.reload();
    } else {
      // Handle errors for guest login
      console.log("Failed to login as guest:", data.message);
      toast.error("Failed to login as guest");
    }
  };

  return (
    <section>
      <h2 className="text-5xl">Login</h2>
      <p className="text-red-500">{loggedInData?.username}さん、こんにちは</p>
      <form onSubmit={handleLogin}>
        <input
          className="text-neutral-900"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          className="text-neutral-900"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <br />
      <button onClick={handleGuestLogin}>Login as Guest</button>

      <Link href="/register">
        <div className="underline">Create an account here </div>
      </Link>
    </section>
  );
};

export default LoginForms;
