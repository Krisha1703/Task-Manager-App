"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react"; // Import useSession from next-auth
import Image from "next/image";
import { motion } from "framer-motion";
import BackgroundParticles from "./particles";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import HomePage from "@/components/home-page"; // Import HomePage component

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { data: session, status } = useSession(); // Access session data and status
  const router = useRouter(); // Use router for navigation

  // Handle mouse movement for mouse-based interactions
  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent full-page reload
    });

    if (result.error) {
      setError(result.error);
    } else {
      // If login is successful, redirect to the homepage
      router.push("/"); // Navigate to the homepage
    }
  };

  // Set up mouse move event listener
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Show a loading state until the session status is determined
  if (status === "loading") {
    return (
      <div className="bg-gradient-to-r from-primary to-secondary w-full h-screen p-4">
        <p>Loading...</p>
      </div>
    );
  }

  // If user is logged in, show HomePage, otherwise show login modal
  if (session) {
    return <HomePage />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
      <BackgroundParticles />
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative z-10"
        style={{
          transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`,
        }}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Login to Task Manager</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <motion.button
            type="submit"
            className="bg-button text-white p-2 rounded w-full"
            initial={{ y: 0, opacity: 1 }}
            whileHover={{ y: 5, opacity: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            Login
          </motion.button>
        </form>

        <h1 className="text-center my-4">Or login with</h1>
        {/* Social Login Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => signIn("google")}
            className="flex justify-center p-2 rounded w-full border-2"
          >
            <Image src={"/google.png"} width={20} height={20} alt="google" className="mr-2" /> Google
          </button>

          <button
            onClick={() => signIn("github")}
            className="flex justify-center p-2 rounded w-full border-2"
          >
            <Image src={"/github.png"} width={40} height={40} alt="github" className="" /> GitHub
          </button>
        </div>
      </div>

      <motion.div
        className="text-8xl mt-0"
        initial={{ x: 40 }}
        animate={{ x: 20, y: 10 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.6,
          ease: "easeInOut",
        }}
      >
        📌
      </motion.div>
    </div>
  );
};

export default LoginModal;
