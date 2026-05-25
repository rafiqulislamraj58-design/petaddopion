"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function PetCard({ pet }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative h-48 w-full">
        <Image
          src={pet.image}
          alt={pet.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{pet.name}</h3>
        <p className="text-gray-500 text-sm mb-1"> {pet.species} • {pet.breed}</p>
        <p className="text-gray-500 text-sm mb-1">{pet.location}</p>
        <p className="text-gray-500 text-sm mb-3"> ${pet.adoptionFee}</p>
        <div className="flex justify-between items-center">
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
            pet.status === 'available' 
            ? 'bg-green-100 text-green-600' 
            : 'bg-red-100 text-red-600'
          }`}>
            {pet.status === 'available' ? 'Available' : 'Adopted'}
          </span>
          <Link href={`/pets/${pet._id}`}>
            <Button color="primary" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}