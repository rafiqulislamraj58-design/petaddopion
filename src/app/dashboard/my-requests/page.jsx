"use client";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@heroui/react";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";

export default function MyRequests() {
  const { user } = useAuth();
  const axios = useAxios();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRequests();
  }, [user]);

  const fetchMyRequests = async () => {
  try {
    const res = await axios.get(`/requests/my-requests?email=${user?.email}`);
    setRequests(res.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const handleCancel = async (id) => {
    if (!confirm("Are you sure you want to cancel this request?")) return;
    try {
      await axios.delete(`/requests/${id}`);
      toast.success("Request cancelled!");
      fetchMyRequests();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <Spinner />;

  return (
    <PrivateRoute>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8">My Requests</h1>

        {requests.length === 0 ? (
          <p className="text-center text-gray-500">No requests yet!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 border-b">Pet Name</th>
                  <th className="text-left p-4 border-b">Request Date</th>
                  <th className="text-left p-4 border-b">Pickup Date</th>
                  <th className="text-left p-4 border-b">Status</th>
                  <th className="text-left p-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50">
                    <td className="p-4 border-b font-medium">{req.petName}</td>
                    <td className="p-4 border-b text-gray-500">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 border-b text-gray-500">{req.pickupDate}</td>
                    <td className="p-4 border-b">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        req.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                        req.status === 'approved' ? 'bg-green-100 text-green-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="p-4 border-b">
                      <div className="flex gap-2">
                        <Link href={`/pets/${req.petId}`}>
                          <Button size="sm" color="primary" variant="flat">
                            View
                          </Button>
                        </Link>
                        {req.status === 'pending' && (
                          <Button
                            size="sm"
                            color="danger"
                            variant="flat"
                            onClick={() => handleCancel(req._id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}