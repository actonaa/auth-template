import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data } = useSession();
  return (
    <nav className="flex justify-end py-5 bg-black">
      <button
        onClick={() => (data ? signOut() : signIn())}
        className=" py-2 px-3 mr-5 rounded-lg bg-white hover:opacity-80"
      >
        {data ? "Logout" : "Login"}
      </button>
    </nav>
  );
}
