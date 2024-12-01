"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data } = useSession();
  console.log(data);
  return (
    <>
      {data ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-3xl font-bold mb-3 text-center">
            Welcome👋,{" "}
            {(data.user as { fullname: string }).fullname || data.user?.name}
          </h1>
          <p className="text-xl font-semibold mb-2 text-center">
            You can use this template for your next project
          </p>
          <p className="mt-4">
            Created by{" "}
            <Link
              href="https://www.linkedin.com/in/actona-putra-002a76255/"
              className="underline text-blue-700 hover:text-sky-500"
            >
              Vio Actona Putra
            </Link>
          </p>
          <div className="mt-4">
            <Link href="https://github.com/actonaa">
              <i className="bx bxl-github text-4xl mr-3 hover:opacity-80"></i>
            </Link>
            <Link href="https://www.linkedin.com/in/actona-putra-002a76255/">
              <i className="bx bxl-linkedin-square text-4xl mr-3 hover:opacity-80"></i>
            </Link>
            <Link href="https://www.instagram.com/act_putraa/">
              <i className="bx bxl-instagram text-4xl hover:opacity-80"></i>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-3xl font-bold mb-3 text-center xm:max-w-[80%]">
            Hello👋, You can try to login
          </h1>
          <p className="mt-4">
            Created by{" "}
            <Link
              href="https://www.linkedin.com/in/actona-putra-002a76255/"
              className="underline text-blue-700 hover:text-sky-500"
            >
              Vio Actona Putra
            </Link>
          </p>
          <div className="mt-4">
            <Link href="https://github.com/actonaa">
              <i className="bx bxl-github text-4xl mr-3 hover:opacity-80"></i>
            </Link>
            <Link href="https://www.linkedin.com/in/actona-putra-002a76255/">
              <i className="bx bxl-linkedin-square text-4xl mr-3 hover:opacity-80"></i>
            </Link>
            <Link href="https://www.instagram.com/act_putraa/">
              <i className="bx bxl-instagram text-4xl hover:opacity-80"></i>
            </Link>
          </div>
        </div>
      )}
      ;
    </>
  );
}
