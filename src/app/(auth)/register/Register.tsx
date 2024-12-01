import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Input from "../_components/Input";
import Button from "../_components/Button";
import AuthContainer from "../_components/Auth";

export default function RegisterView() {
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");

  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessageError("");

    const form = event.target as HTMLFormElement;

    const email = form.email.value;
    const fullname = form.fullname.value;
    const phone = form.phone.value;
    const password = form.password.value;

    // Client side validation
    if (!email || !fullname || !phone || !password) {
      setMessageError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const data = {
      email,
      fullname,
      phone,
      password,
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setLoading(false);
        setMessageError("");
        form.reset();
        push("/login");
      } else {
        setMessageError("Register failed");
        setLoading(false);
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
      text="Already have an account? Login "
      href="/login"
      title="Register"
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
          htmlfor="fullname"
          label="Fullname"
          type="text"
          id="fullname"
          name="fullname"
        />
        <Input
          htmlfor="phone"
          label="Phone"
          type="text"
          id="phone"
          name="phone"
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
          className="w-full bg-black text-white py-3 hover:opacity-80 dark:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthContainer>
  );
}
