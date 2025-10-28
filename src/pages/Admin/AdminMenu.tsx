import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { colors } from "../../constant/color";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const AdminMenu: React.FC = () => {
    const queryClient = useQueryClient();

    //get menu list
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["menus"],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-menu-list`);
            return res.data.data;
        },
    });
    console.log("data", data)


    //delete menu
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            return await axios.delete(`${import.meta.env.VITE_API_URL}/delete-menu/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menus"] })
        }
    })

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id)
    }


    //menu update
    // const updateMutation = useMutation({
    //     mutationFn : async ({id, data}:{id:string, data:Inputs})=>{
    //         return await axios.put(`${import.meta.env.VITE_API_URL}/update-menu/${id}`)
    //     }
    // })

    // const handleUpdate = ()=>{
    //     const updateData = {
            
    //     }
    // }


    if (isLoading)
        return <p className="text-center mt-10 text-lg" style={{ color: colors.text }}>Loading menus...</p>;
    if (isError)
        return (
            <p className="text-center mt-10 text-red-600">
                Error: {(error as Error).message}
            </p>
        );




    return (
        <div className="p-8 min-h-screen" style={{ backgroundColor: colors.bg }}>
            <h2
                className="text-3xl font-bold mb-6 flex items-center gap-2"
                style={{ color: colors.text }}
            >
                🍔 Menu List
            </h2>

            <div
                className="overflow-hidden shadow-md rounded-2xl"
                style={{ border: `1px solid ${colors.card}` }}
            >
                <table className="w-full">
                    <thead style={{ backgroundColor: colors.accent, color: colors.white }}>
                        <tr>
                            <th className="p-4 text-left">Photo</th>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Price</th>
                            <th className="p-4 text-left">Quantity</th>
                            <th className="p-4 text-left">Description</th>
                            <th className="p-4 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody style={{ backgroundColor: colors.bg }}>
                        {data?.map((menu: Inputs) => (
                            <tr
                                key={menu._id}
                                className="transition-colors duration-200"
                                style={{
                                    borderBottom: `1px solid ${colors.card}`,
                                }}
                            >
                                <td className="p-3">
                                    {menu.photo ? (
                                        <img
                                            src={`${import.meta.env.VITE_API_URL}/uploads/${menu.photo}`}
                                            alt={menu.menu}
                                            className="w-16 h-16 object-cover rounded-lg border"
                                            style={{ borderColor: colors.card }}
                                        />
                                    ) : (
                                        <div
                                            className="w-16 h-16 flex items-center justify-center rounded-lg text-sm italic"
                                            style={{
                                                backgroundColor: colors.card,
                                                color: colors.text,
                                            }}
                                        >
                                            No Photo
                                        </div>
                                    )}
                                </td>
                                <td className="p-3 font-medium" style={{ color: colors.text }}>
                                    {menu.menu}
                                </td>
                                <td className="p-3" style={{ color: colors.text }}>
                                    ${menu.price}
                                </td>
                                <td className="p-3" style={{ color: colors.text }}>
                                    {menu.quantity}
                                </td>
                                <td className="p-3" style={{ color: colors.text }}>
                                    {menu.description}
                                </td>
                                <td className="p-3" >
                                    <button type="submit" className="text-2xl mr-2 text-green-600"><FaRegEdit /></button>
                                    <button onClick={() => handleDelete(menu._id ? menu._id : "")} type="submit" className="text-2xl text-red-600"><MdDelete /> </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminMenu;
