"use client"; // Menandai ini sebagai Komponen Sisi Klien

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation"; // Untuk navigasi Next.js 13+
import { FormEvent, useState } from "react";
import Input from "../_components/Input";
import Button from "../_components/Button";
import AuthContainer from "../_components/Auth";

export default function LoginView() {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");

  const { push } = useRouter();
  const searchParams = useSearchParams(); // Hook untuk mendapatkan query params seperti callbackUrl
  const callbackUrl = searchParams?.get("callbackUrl") || "/"; // Default ke '/' jika tidak ada callbackUrl

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessageError("");

    const form = event.target as HTMLFormElement;

    const email = form.email.value;
    const password = form.password.value;

    // Validasi sisi klien
    if (!email || !password) {
      setMessageError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (!res?.error) {
        setLoading(false);
        form.reset();
        push(callbackUrl); // Redirect ke callback URL setelah berhasil
      } else {
        setLoading(false);
        setMessageError("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMessageError("Fetch error");
    }
  };

  return (
    <AuthContainer
      messageError={messageError}
      text="Don't have an account? register "
      href="/register"
      title="Login"
    >
      <form onSubmit={handleSubmit}>
        <Input
          htmlfor="email"
          label="Email"
          type="email"
          id="email"
          name="email"
        />
        <Input
          htmlfor="password"
          label="Password"
          type="password"
          id="password"
          name="password"
        />
        <Button
          type="submit"
          className="w-full bg-black text-white py-3 hover:opacity-80"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
      <hr className="my-5 border-slate-500" />
      <Button
        type="button"
        onClick={() => signIn("google", { callbackUrl, redirect: false })}
        className="w-full flex gap-2 items-center justify-center bg-black text-white py-2 hover:bg-[#357AE8] mt-2 dark:bg-blue-600"
      >
        <i className="bx bxl-google text-2xl text-white"></i>
        <p>Login with Google</p>
      </Button>
      <Button
        type="button"
        onClick={() => signIn("facebook", { callbackUrl, redirect: false })}
        className="w-full flex gap-2 items-center justify-center bg-black text-white py-2 hover:bg-blue-600 mt-2 dark:bg-blue-600"
      >
        <i className="bx bxl-facebook text-2xl text-white"></i>
        <p>Login with Facebook</p>
      </Button>
      <Button
        type="button"
        onClick={() => signIn("github", { callbackUrl, redirect: false })}
        className="w-full flex gap-2 items-center justify-center bg-black text-white py-2 hover:bg-blue-600 mt-2 dark:bg-blue-600"
      >
        <i className="bx bxl-github text-2xl text-white"></i>
        <p>Login with GitHub</p>
      </Button>
    </AuthContainer>
  );
}
