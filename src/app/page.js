//Task Manager App
"use client";
import { SessionProvider } from "next-auth/react";
import HomePage from "@/components/home-page";

export default function Home() {
  return (
    <SessionProvider>
      <div className="bg-gradient-to-r from-primary to-secondary w-full h-full p-4">
        <HomePage />
      </div>
    </SessionProvider>
  );
}
