"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import { Button, Input, Card } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const {
    register,
    updateUserProfile,
    googleLogin,
  } = useAuth();

  const router = useRouter();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return toast.error(
        "Password must be at least 6 characters!"
      );
    }

    if (!/[A-Z]/.test(password)) {
      return toast.error(
        "Password must contain one uppercase letter!"
      );
    }

    if (!/[a-z]/.test(password)) {
      return toast.error(
        "Password must contain one lowercase letter!"
      );
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      await register(email, password);

      await updateUserProfile(name, photo);

      toast.success("Registration successful!");

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 px-4 py-10">
      
      <Card className="w-full max-w-md p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          
          <h1 className="text-3xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Register to continue
          </p>

        </div>
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-5"
        >
          <Input
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            variant="bordered"
            size="lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            type="text"
            label="Photo URL"
            placeholder="Enter your photo URL"
            variant="bordered"
            size="lg"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
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

          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            variant="bordered"
            size="lg"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />

          <Button
            type="submit"
            color="primary"
            size="lg"
            className="font-semibold"
          >
            Register
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
          variant="bordered "
          size="lg"
          className="w-full font-medium bg-gray-200"
          onClick={handleGoogleLogin}
          startContent={<FcGoogle size={22} />}
        >
          Continue with Google
        </Button>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}

          <Link
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </Card>
    </div>
  );
}