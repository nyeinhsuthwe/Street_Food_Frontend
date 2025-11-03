import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { colors } from "../../constant/color";
import { FaRegEdit } from "react-icons/fa";
import { useApiQuery } from "../../hook/useQuery";
import { useApiMutation } from "../../hook/useMutation";
import { MdDelete } from "react-icons/md";
import { useLocation } from "react-router-dom";
import UpdateMenu from "./UpdateMenu";

const AdminMenu: React.FC = () => {
  const queryClient = useQueryClient();
  const location = useLocation();

  const initialCategory = location.state?.categoryId || "All";
  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<Inputs | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(7);

  const {
    data: menusData,
    isLoading,
    isError,
    error,
  } = useApiQuery(
    {
      queryKey: ["menus", selectedCategory, page],
      endpoint: `${
        import.meta.env.VITE_API_URL
      }/get-menu-list?pageNo=${page}&pageSize=${limit}${
        selectedCategory !== "All" ? `&category_id=${selectedCategory}` : ""
      }`,
    },
    {
      select: (res: any) => res,
    }
  );

  const menus = menusData?.data || [];
  const totalPages = menusData?.totalPages || 1;
  const currentPage = menusData?.currentPage || 1;

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

  const handleEdit = (menu: Inputs) => {
    setSelectedMenu(menu);
  };

  const { data: categories } = useApiQuery(
    {
      queryKey: ["categories"],
      endpoint: `${import.meta.env.VITE_API_URL}/get-category-list`,
    },
    { select: (res: any) => res.data }
  );

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
      : menus.filter((menu: Inputs) => menu.category_id === selectedCategory);

  return (
    <div
      className="p-8 min-h-screen w-full mt-10"
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
        style={{ border: `1px solid ${colors.card}`, height: "680px" }}
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
                onClick={() => setActiveRow(menu._id ?? null)}
                className={`transition-transform duration-200 ease-in-out cursor-pointer ${
                  activeRow === menu._id
                    ? "transform scale-105 shadow-sm"
                    : "hover:scale-105 "
                }`}
                style={{
                  borderBottom: `1px solid ${colors.card}`,
                }}
              >
                <td className="text-center py-3">
                  <img
                    src={
                      menu.photo
                        ? `${import.meta.env.VITE_API_URL}/uploads/${
                            menu.photo
                          }`
                        : "/no-photo.png"
                    }
                    alt={menu.menu}
                    className="w-16 h-16 object-cover rounded-lg mx-auto"
                  />
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
                  {menu.description || "-"}
                </td>
                <td className="text-center">
                  <button
                    type="button"
                    onClick={() => handleEdit(menu)}
                    className="text-2xl mr-2 text-green-600"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(menu._id)}
                    type="button"
                    className="text-2xl text-red-600"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-6 gap-4">
        <span className="font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={() =>
            setPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {selectedMenu && (
        <UpdateMenu
          menu={selectedMenu}
          onClose={() => {
            setSelectedMenu(null);
            setActiveRow(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminMenu;
