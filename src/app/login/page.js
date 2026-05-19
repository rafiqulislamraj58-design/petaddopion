"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import { Button, Input, Card } from "@heroui/react";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, googleLogin } = useAuth();

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);

      toast.success("Login successful!");

      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();

      toast.success("Login successful!");

      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-300 px-4">
      <Card className="w-full max-w-md p-8 shadow-2xl rounded-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
          
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to your account
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5"
        >
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            variant="bordered"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            color="primary"
            size="lg"
            className="font-semibold"
          >
            Login
          </Button>
        </form>
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[1px] bg-gray-300"></div>

          <span className="text-sm text-gray-400">
            OR
          </span>

          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>
        <Button
          variant="bordered"
          size="lg"
          className="w-full font-medium bg-gray-300"
          onClick={handleGoogleLogin}
         
        >
          Continue with Google
        </Button>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          
          <Link
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </Card>
    </div>
  );
}