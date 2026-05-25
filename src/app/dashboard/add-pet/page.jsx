"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import useAxios from "@/hooks/useAxios";
import { Button, Input } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";

export default function AddPet() {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await axios.post('/pets', {
      ...formData,
      ownerEmail: user.email,
    });
    toast.success("Pet added successfully!");
    router.push("/dashboard/my-listings");
  } catch (error) {
    console.log(error.response?.data);
    toast.error(error.response?.data?.message || "Something went wrong!");
  } finally {
    setLoading(false);
  }
};

  return (
    <PrivateRoute>
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add Pet </h1>
          <p className="text-gray-500 mt-1">Fill in the details to list your pet for adoption</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Pet Name" 
                name="name" 
                placeholder="Enter pet name"
                onChange={handleChange} 
                required 
              />
              <Input 
                label="Breed" 
                name="breed" 
                placeholder="Enter breed"
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Species</label>
                <select 
                  name="species" 
                  onChange={handleChange} 
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300" 
                  required
                >
                  <option value="">Select Species</option>
                  <option value="Dog"> Dog</option>
                  <option value="Cat"> Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit"> Rabbit</option>
                  <option value="Other"> Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Gender</label>
                <select 
                  name="gender" 
                  onChange={handleChange} 
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300" 
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
                label="Age (years)" 
                name="age" 
                type="number" 
                placeholder="Enter age"
                onChange={handleChange} 
                required />
              <Input 
                label="Adoption Fee ($)" 
                name="adoptionFee" 
                type="number" 
                placeholder="Enter fee"
                onChange={handleChange} 
                required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Health Status" 
                name="healthStatus" 
                placeholder="e.g. Healthy"
                onChange={handleChange} 
                required />
              <Input 
                label="Vaccination Status" 
                name="vaccinationStatus" 
                placeholder="e.g. Vaccinated"
                onChange={handleChange} 
                required />
            </div>
            <Input 
              label="Location" 
              name="location" 
              placeholder="Enter location"
              onChange={handleChange} 
              required />
            <Input 
            label="Image URL" 
            name="image" 
            placeholder="Enter image URL (imgbb/postimage)"
            onChange={handleChange} 
            required />
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Description</label>
              <textarea
                name="description"
                placeholder="Write about the pet..."
                onChange={handleChange}
                className="w-full border rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <Input
              label="Owner Email"
              value={user?.email || ""}
              readOnly
              className="bg-gray-50"
            />

            <Button 
              type="submit" 
              color="primary" 
              className="w-full"
              isLoading={loading}
            >
              {loading ? "Adding..." : "Add Pet "}
            </Button>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
}