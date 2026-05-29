import Link from "next/link";
import { Button } from "@heroui/react";

export default function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Welcome to Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/my-requests">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-bold mb-2">My Requests</h3>
            <p className="text-gray-500">View your adoption requests</p>
          </div>
        </Link>
        
        <Link href="/dashboard/add-pet">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-bold mb-2">Add Pet</h3>
            <p className="text-gray-500">List a pet for adoption</p>
          </div>
        </Link>
        
        <Link href="/dashboard/my-listings">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-bold mb-2">My Listings</h3>
            <p className="text-gray-500">Manage your pet listings</p>
          </div>
        </Link>
      </div>
    </div>
  );
}