import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface Inputs  {
  name: string;
  price: number;
  quantity: number;
  description: string;
  photo: string;
};

const AdminDashboard: React.FC = () => {
  const { register, handleSubmit } = useForm<Inputs>();

 const mutation = useMutation({
    mutationFn : async (menu)=>{
      console.log(menu)
      return await axios.post(`${import.meta.env.VITE_API_URL}/create-menu`, menu)
    }
  })

const onSubmit = (menu:any)=>{
  const data:any = {
    name : menu.name,
    price: menu.price,
    quantity: menu.quantity,
    description : menu.description,
    // photo: menu.photo
  }
  mutation.mutate(data);
}

const onError = (errors:any) => {
  console.error("error",JSON.stringify(errors, null, 2))

}
  return (
    <main className="bg-[#ffffff] min-h-screen pr-8 pl-8 pb-8 pt-3  w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-red-500">🍔 Menu Management</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#3D2C2E] mb-4">
              Create Menu Item
            </h2>
            <button type="submit" className="flex items-center gap-2 bg-[#fa8627] hover:bg-[#F4A261] text-white px-5 py-2 rounded-xl shadow-md transition font-semibold">
              <FaPlus /> Add Item
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#3D2C2E] mb-1">
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3D2C2E] mb-1">
                Price ($)
              </label>
              <input
                type="number"
                {...register("price")}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3D2C2E] mb-1">
                Quantity
              </label>
              <input
                type="number"
                {...register("quantity")}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter quantity"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-[#3D2C2E] mb-1">
                Description
              </label>
              <textarea
                {...register("description")}
                className="w-full p-3 border rounded-lg"
                rows={3}
                placeholder="Enter description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3D2C2E] mb-1">
                Upload Photo
              </label>
              <input
                {...register("photo")}
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 file:font-semibold 
                         file:bg-red-500 file:text-white hover:file:bg-[#fa8627]"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Menu Items Table */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-[#3D2C2E] mb-4">📋 Menu Items</h2>
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#fa8627] text-white">
              <th className="p-3 text-left">Photo</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
        </table>
      </div>
    </main>
  );
};

export default AdminDashboard;
