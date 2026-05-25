"use client";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { Button } from "@heroui/react";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";

export default function MyListings() {
  const { user } = useAuth();
  const axios = useAxios();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMyPets();
  }, [user]);

  const fetchMyPets = async () => {
    try {
      const res = await axios.get(`/pets?ownerEmail=${user?.email}`);
      const myPets = res.data.filter(pet => pet.ownerEmail === user?.email);
      setPets(myPets);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this pet?")) return;
    try {
      await axios.delete(`/pets/${id}`);
      toast.success("Pet deleted!");
      fetchMyPets();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleViewRequests = async (pet) => {
    setSelectedPet(pet);
    try {
      const res = await axios.get(`/requests/pet-requests/${pet._id}`);
      setRequests(res.data);
      setShowModal(true);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await axios.put(`/requests/approve/${requestId}`);
      toast.success("Request approved!");
      setShowModal(false);
      fetchMyPets();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.put(`/requests/reject/${requestId}`);
      toast.success("Request rejected!");
      const res = await axios.get(`/requests/pet-requests/${selectedPet._id}`);
      setRequests(res.data);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <Spinner />;

  return (
    <PrivateRoute>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">My Listings</h1>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <h3 className="text-2xl font-bold text-blue-600">{pets.length}</h3>
            <p className="text-gray-500">Total Listings</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <h3 className="text-2xl font-bold text-green-600">
              {pets.filter(p => p.status === 'available').length}
            </h3>
            <p className="text-gray-500">Available</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 text-center">
            <h3 className="text-2xl font-bold text-red-600">
              {pets.filter(p => p.status === 'adopted').length}
            </h3>
            <p className="text-gray-500">Adopted</p>
          </div>
        </div>
        {pets.length === 0 ? (
          <p className="text-center text-gray-500">No pets listed yet!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div key={pet._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src={pet.image} alt={pet.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-1">{pet.name}</h3>
                  <p className="text-gray-500 text-sm mb-1">{pet.species} • {pet.breed}</p>
                  <p className="text-gray-500 text-sm mb-3">${pet.adoptionFee}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    pet.status === 'available' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                  }`}>
                    {pet.status}
                  </span>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button 
                      size="sm" 
                      color="primary" 
                      variant="flat"
                      onClick={() => handleViewRequests(pet)}
                    >
                      Requests
                    </Button>
                    <Link href={`/pets/${pet._id}`}>
                      <Button size="sm" color="default" variant="flat" className="w-full">
                        View
                      </Button>
                    </Link>
                    <Link href={`/dashboard/edit-pet/${pet._id}`}>
                      <Button size="sm" color="warning" variant="flat" className="w-full">
                        Edit
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      color="danger" 
                      variant="flat"
                      onClick={() => handleDelete(pet._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">
                Requests for {selectedPet?.name}
              </h2>

              {requests.length === 0 ? (
                <p className="text-gray-500">No requests yet!</p>
              ) : (
                <div className="space-y-4">
                  {requests.map((req) => (
                    <div key={req._id} className="border rounded-lg p-4">
                      <p className="font-medium">{req.userName}</p>
                      <p className="text-gray-500 text-sm">{req.userEmail}</p>
                      <p className="text-gray-500 text-sm">Pickup: {req.pickupDate}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        req.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                        req.status === 'approved' ? 'bg-green-100 text-green-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {req.status}
                      </span>

                      {req.status === 'pending' && (
                        <div className="flex gap-2 mt-3">
                          <Button 
                            size="sm" 
                            color="success"
                            onClick={() => handleApprove(req._id)}
                          >
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            color="danger"
                            onClick={() => handleReject(req._id)}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <Button 
                className="mt-4 w-full" 
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}