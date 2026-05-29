"use client";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";

export default function FeaturedPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await axios.get('/pets');
      setPets(res.data.slice(0, 6));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center py-10">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (pets.length === 0) return (
    <p className="text-center text-gray-500">No pets available yet!</p>
  );

  return (
   <>
   <div className="heading mt-5 mb-5">
    <h1 className="font-bold text-5xl text-center">Featured Pets</h1>
   </div>
    <div className="container mx-auto mb-8">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 CONTAINER mx-auto">
      {pets.map((pet) => (
        <div key={pet._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
          <div className="relative h-52 w-full">
            <Image
              src={pet.image}
              alt={pet.name}
              fill
              className="object-cover"
            />
            <span className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-medium ${
              pet.status === 'available'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}>
              {pet.status === 'available' ? 'Available' : 'Adopted'}
            </span>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-1">{pet.name}</h3>
            <p className="text-gray-500 text-sm">{pet.species} • {pet.breed}</p>
            <p className="text-gray-500 text-sm">{pet.location}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-blue-600 font-bold">${pet.adoptionFee}</span>
              <Link href={`/pets/${pet._id}`}>
                <Button color="primary" size="sm" radius="full">
                  View Details
                </Button>
              </Link>
            </div>
          </div>

        </div>
      ))}
    </div>
    </div>
   </>
  );
}

