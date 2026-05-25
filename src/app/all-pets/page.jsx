"use client";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import PetCard from "@/components/PetCard";
import Spinner from "@/components/Spinner";
import { Input } from "@heroui/react";

export default function AllPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("");
  const axios = useAxios();

  useEffect(() => {
    fetchPets();
  }, [search, species]);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/pets', {
        params: { search, species }
      });
      setPets(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">All Pets </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2"
        />
        <select
          onChange={(e) => setSpecies(e.target.value)}
          className="w-full md:w-1/2 border rounded-lg p-2"
        >
          <option value="">All Species</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Rabbit">Rabbit</option>
        </select>
      </div>
      {loading ? (
        <Spinner />
      ) : pets.length === 0 ? (
        <p className="text-center text-gray-500">No pets found!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
}