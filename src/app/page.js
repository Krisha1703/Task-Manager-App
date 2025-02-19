//Task Manager App
"use client";
import { SessionProvider } from "next-auth/react";
import LoginModal from "@/components/login";

export default function Home() {
  return (
    <SessionProvider>
      <div className="bg-gradient-to-r from-primary to-secondary w-full h-screen p-4">
        <LoginModal />
      </div>
    </SessionProvider>
  );
}
