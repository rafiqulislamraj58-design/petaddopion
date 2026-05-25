"use client";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@heroui/react";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const axios = useAxios();
  const router = useRouter();

  const [formData, setFormData] = useState({
    pickupDate: "",
    message: "",
  });

  useEffect(() => {
    fetchPet();
  }, [id]);

  const fetchPet = async () => {
    try {
      const res = await axios.get(`/pets/${id}`);
      setPet(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdopt = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login first!");
      router.push("/login");
      return;
    }
    if (user.email === pet.ownerEmail) {
      toast.error("You cannot adopt your own pet!");
      return;
    }
    try {
      await axios.post('/requests', {
        petId: pet._id,
        petName: pet.name,
        userName: user.displayName,
        userEmail: user.email,
        pickupDate: formData.pickupDate,
        message: formData.message,
      });
      toast.success("Adoption request sent!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <Spinner />;
  if (!pet) return <p className="text-center py-10">Pet not found!</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="relative h-80 w-full rounded-xl overflow-hidden">
            <Image src={pet.image} alt={pet.name} fill className="object-cover" />
          </div>
          <div className="mt-6 space-y-2">
            <h1 className="text-3xl font-bold">{pet.name}</h1>
            <p className="text-gray-500">Species: {pet.species}</p>
            <p className="text-gray-500">Breed: {pet.breed}</p>
            <p className="text-gray-500">Age: {pet.age} years</p>
            <p className="text-gray-500">Gender: {pet.gender}</p>
            <p className="text-gray-500">Location: {pet.location}</p>
            <p className="text-gray-500">Health: {pet.healthStatus}</p>
            <p className="text-gray-500">Vaccination: {pet.vaccinationStatus}</p>
            <p className="text-gray-500">Adoption Fee: ${pet.adoptionFee}</p>
            <p className="text-gray-700 mt-4">{pet.description}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 h-fit">
          <h2 className="text-2xl font-bold mb-6">Adopt {pet.name}</h2>

          <form onSubmit={handleAdopt} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Pet Name</label>
              <input value={pet.name} readOnly className="w-full border rounded-lg p-2 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Your Name</label>
              <input value={user?.displayName || ""} readOnly className="w-full border rounded-lg p-2 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Your Email</label>
              <input value={user?.email || ""} readOnly className="w-full border rounded-lg p-2 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Pickup Date</label>
              <input
                type="date"
                onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Message</label>
              <textarea
                placeholder="Why do you want to adopt this pet?"
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full border rounded-lg p-3 h-32"
              />
            </div>
            <Button
              type="submit"
              color="primary"
              className="w-full"
              isDisabled={pet.status === 'adopted'}
            >
              {pet.status === 'adopted' ? 'Already Adopted' : 'Adopt Now'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}