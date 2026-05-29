"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

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
    <nav className="bg-gray-300 shadow-md px-6 py-3">
      <div className="flex items-center justify-between">

        <Link href="/" className="text-xl font-bold text-pink-600">
          PetAdopt
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-blue-500">Home</Link>
          <Link href="/all-pets" className="hover:text-blue-500">All Pets</Link>
          {user && (
            <Link href="/dashboard/my-requests" className="hover:text-blue-500">
              My Requests
            </Link>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
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
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 rounded">
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

        <button className="md:hidden text-xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 pb-4 border-t pt-4">
          <Link href="/" className="block hover:text-blue-500" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/all-pets" className="block hover:text-blue-500" onClick={() => setMenuOpen(false)}>All Pets</Link>
          {user && (
            <Link href="/dashboard/my-requests" className="block hover:text-blue-500" onClick={() => setMenuOpen(false)}>
              My Requests
            </Link>
          )}
          {user ? (
            <>
              <Link href="/dashboard" className="block hover:text-blue-500" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="block text-red-500">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              <Button color="primary" size="sm">Login</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}