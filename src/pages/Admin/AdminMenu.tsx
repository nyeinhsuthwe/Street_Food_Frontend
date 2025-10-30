import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { colors } from "../../constant/color";
import { FaRegEdit } from "react-icons/fa";
import { useApiQuery } from "../../hook/useQuery";
import { useApiMutation } from "../../hook/useMutation";
import { MdDelete } from "react-icons/md";
import { useLocation } from "react-router-dom";

const AdminMenu: React.FC = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  
  const initialCategory = location.state?.categoryId || "All";
  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);

  const {
    data: menus,
    isLoading,
    isError,
    error,
  } = useApiQuery(
    {
      queryKey: ["menus"],
      endpoint: `${import.meta.env.VITE_API_URL}/get-menu-list`,
    },
    {
      select: (res: any) => res.data,
    }
  );
  console.log("data", menus);

  const deleteMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });

  const handleDelete = (id: any) => {
    deleteMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/delete-menu/${id}`,
      method: "DELETE",
    });
  };

  const { data: categories } = useApiQuery(
    {
      queryKey: ["categories"],
      endpoint: `${import.meta.env.VITE_API_URL}/get-category-list`,
    },
    { select: (res: any) => res.data }
  );

  console.log("cat", categories);

  if (isLoading)
    return (
      <p className="text-center mt-10 text-lg" style={{ color: colors.text }}>
        Loading menus...
      </p>
    );
  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">
        Error: {(error as Error).message}
      </p>
    );

  const filterMenu =
  selectedCategory === "All"
    ? menus
    : menus?.filter((menu: Inputs) => menu.category_id === selectedCategory);


  return (
    <div
      className="p-8 min-h-screen w-full"
      style={{ backgroundColor: colors.bg }}
    >
      <div className="flex space-x-6 ml-[120px]">
        <h2
          className="text-3xl font-bold mb-3 flex items-center gap-2"
          style={{ color: colors.text }}
        >
          🍔 Menu List
        </h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4  text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="All">All Categories</option>
          {categories?.map((cat: any) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div
        className="overflow-hidden shadow-md mt-4 rounded-2xl w-7xl mx-auto"
        style={{ border: `1px solid ${colors.card}` }}
      >
        <table className="w-full">
          <thead
            style={{ backgroundColor: colors.accent, color: colors.white }}
          >
            <tr>
              <th className="p-4 text-center">Photo</th>
              <th className="p-4 text-center">Name</th>
              <th className="p-4 text-center">Price</th>
              <th className="p-4 text-center">Description</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody style={{ backgroundColor: colors.bg }}>
            {filterMenu?.map((menu: Inputs) => (
              <tr
                key={menu._id}
                className="transition-colors duration-200"
                style={{
                  borderBottom: `1px solid ${colors.card}`,
                }}
              >
                <td className="flex items-center justify-center my-3">
                  {menu.photo ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${
                        menu.photo
                      }`}
                      alt={menu.menu}
                      className="w-16 h-16 object-cover rounded-lg border"
                      style={{ borderColor: colors.card }}
                    />
                  ) : (
                    <div
                      className="w-16 h-16 px-1 flex items-center justify-center text-center rounded-lg text-sm italic"
                      style={{
                        backgroundColor: colors.card,
                        color: colors.text,
                      }}
                    >
                      No Photo
                    </div>
                  )}
                </td>
                <td
                  className="text-center font-medium"
                  style={{ color: colors.text }}
                >
                  {menu.menu}
                </td>
                <td className="text-center" style={{ color: colors.text }}>
                  ${menu.price}
                </td>
                <td className="text-center" style={{ color: colors.text }}>
                  {menu.description ? (
                    menu.description
                  ) : (
                    <div
                      className="flex items-center justify-center text-sm italic"
                      style={{
                        color: colors.text,
                      }}
                    >
                      No Description
                    </div>
                  )}
                </td>
                <td className="text-center">
                  <button
                    type="submit"
                    className="text-2xl mr-2 text-green-600"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(menu._id ? menu._id : "")}
                    type="submit"
                    className="text-2xl text-red-600"
                  >
                    <MdDelete />{" "}
                  </button>
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

