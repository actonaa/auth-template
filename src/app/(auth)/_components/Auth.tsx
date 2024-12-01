import Link from "next/link";
import Header from "./Header";

type PropsAuth = {
  messageError: string;
  children: React.ReactNode;
  text: string;
  href: string;
  title: string;
};

export default function AuthContainer({
  messageError,
  children,
  text,
  href,
  title,
}: PropsAuth) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Header title={title} messageError={messageError} />
      <div className="border border-slate-500 w-[30%] p-5 rounded-lg shadow-lg xm:w-3/4">
        {children}
      </div>
      <p className="mt-3 text-slate-700 dark:text-white">
        {text}
        <Link
          href={href || "/"}
          className="underline text-blue-700 hover:text-blue-500"
        >
          here
        </Link>
      </p>
    </div>
  );
}
