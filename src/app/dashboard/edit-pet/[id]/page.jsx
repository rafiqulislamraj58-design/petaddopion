"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import useAxios from "@/hooks/useAxios";
import { Button, Input } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";

export default function EditPet() {
  const { id } = useParams();
  const { user } = useAuth();
  const axios = useAxios();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    image: "",
    healthStatus: "",
    vaccinationStatus: "",
    location: "",
    adoptionFee: "",
    description: "",
  });

  useEffect(() => {
    fetchPet();
  }, [id]);

  const fetchPet = async () => {
    try {
      const res = await axios.get(`/pets/${id}`);
      setFormData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/pets/${id}`, formData);
      toast.success("Pet updated successfully!");
      router.push("/dashboard/my-listings");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Edit Pet</h1>
          <p className="text-gray-500 mt-1">Update your pet details</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Pet Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Species</label>
                <select
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  required
                >
                  <option value="">Select Species</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
              />
              <Input
                label="Adoption Fee"
                name="adoptionFee"
                type="number"
                value={formData.adoptionFee}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Health Status"
                name="healthStatus"
                value={formData.healthStatus}
                onChange={handleChange}
                required
              />
              <Input
                label="Vaccination Status"
                name="vaccinationStatus"
                value={formData.vaccinationStatus}
                onChange={handleChange}
                required
              />
            </div>

            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <Input
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />

            <div>
              <label className="text-sm text-gray-600 mb-1 block">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 h-32"
                required
              />
            </div>

            <Button
              type="submit"
              color="primary"
              className="w-full"
              isLoading={loading}
            >
              {loading ? "Updating..." : "Update Pet"}
            </Button>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
}