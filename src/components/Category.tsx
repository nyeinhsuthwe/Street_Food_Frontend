import axios from "axios";
import { colors } from "../constant/color";
import { useQuery } from "@tanstack/react-query";

const Category: React.FC = () => {

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-category-list`
      );
      return res.data.data;
    },

  });

  return (
    <div className=" w-full flex justify-center">
      <section
        className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 pb-10"
        style={{ backgroundColor: colors.bg }}
      >
        {data?.map((category: Categories) => (
          <div
            key={category._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${category.photo}`}
              alt={category.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="font-bold text-lg" style={{ color: colors.text }}>
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Category;
