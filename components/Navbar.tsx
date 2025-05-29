import { auth, signOut, signIn } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          <Image
            src="/logo.png"
            alt="Logo"
            width={144}
            height={30}
            priority={true}
          />
        </Link>

        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link
                href="/startup/create"
                className="text-gray-800 hover:text-blue-600"
              >
                <span className="font-bold">Create</span>
              </Link>

              <Link
                href={`/user/${session?.user?.id}`}
                className="text-gray-800 hover:text-blue-600"
              >
                <span className="font-bold">{session?.user?.name}</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
                className="text-black"
              >
                <button type="submit">
                  <span className="font-bold">Sign Out</span>
                </button>
              </form>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
              className="text-black"
            >
              <button type="submit">
                <span className="font-bold">Sign In</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;