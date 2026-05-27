"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";
import Image from "next/image";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out!");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">

      <Link href="/" className="text-xl font-bold text-pink-600">
         PetAdopt 
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/" className="hover:text-blue-500">
          Home
        </Link>
        <Link href="/all-pets" className="hover:text-blue-500">
          All Pets
        </Link>

        {user && (
          <Link href="/dashboard/my-requests" className="hover:text-blue-500">
            My Requests
          </Link>
        )}
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            {user.photoURL && (
              <Image
                src={user.photoURL}
                alt="profile"
                width={35}
                height={35}
                className="rounded-full"
              />
            )}
            <div className="relative group">
              <span className="cursor-pointer font-medium">
                {user.displayName}
              </span>
              <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-lg p-2 w-40 z-50">
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100 rounded"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link href="/login">
            <Button color="primary">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}