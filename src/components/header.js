"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button/button";

const Header = () => {
  const { data: session } = useSession();

  // Check if the user is the test user
  const isTestUser = session?.user?.email === "testuser@mail.com";

  return (
    <header className="flex justify-between items-center my-4 px-4">
      <Link href={"/"}>
        <span className="text-4xl font-bold">Task Manager</span>
      </Link>

      {session ? (
        <div className="flex items-center space-x-2">
          <div className="flex text-nowrap font-semibold text-xl">
            <h1>Hi, {isTestUser ? "Test User" : session.user.name?.split(" ")[0]}</h1>
          </div>

          <Image
            src={isTestUser ? "/user.png" : session.user.image || "/user.png"}
            width={60}
            height={60}
            alt="Profile"
            className="rounded-full cursor-pointer"
          />

          <Button onClick={() => signOut()} text={"Sign Out"} create />
        </div>
      ) : (
        <Image
          src={"/user.png"}
          width={60}
          height={60}
          alt="user"
          onClick={() => signIn("google")}
          className="cursor-pointer"
        />
      )}
    </header>
  );
};

export default Header;
