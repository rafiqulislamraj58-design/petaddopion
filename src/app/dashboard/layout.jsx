"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard/my-requests", label: "My Requests" },
    { href: "/dashboard/add-pet", label: "Add Pet" },
    { href: "/dashboard/my-listings", label: "My Listings" },
  ];
  return (
    <PrivateRoute>
      <div className="flex min-h-screen">
        <aside className="w-64 bg-gray-500 text-white p-6">
          <h2 className="text-xl font-bold mb-8">Dashboard</h2>
          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg transition ${
                  pathname === link.href
                    ? "bg-pink-300 text-white"
                    : "hover:bg-gray-700 text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </PrivateRoute>
  );
}