import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaSave, FaTimes } from "react-icons/fa";
import { colors } from "../../constant/color";
import { useApiMutation } from "../../hook/useMutation";
import { useQueryClient } from "@tanstack/react-query";

interface UpdateCategoryProps {
  category: Categories;
  onClose: () => void;
}

const UpdateCategoryForm: React.FC<UpdateCategoryProps> = ({
  category,
  onClose,
}) => {
  const { register, handleSubmit, setValue } = useForm<Categories>();
  const queryClient = useQueryClient();

  const [preview, setPreview] = useState<string | null>(null);

  const updateMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onClose();
    },
    onError: (err: any) => {
      console.error("Update failed:", err);
    },
  });

  useEffect(() => {
    setValue("name", category.name);
    setPreview(`${import.meta.env.VITE_API_URL}/uploads/${category.photo}`);
  }, [category, setValue]);

  const onSubmit = (data: Categories) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.photo && data.photo[0]) {
      formData.append("photo", data.photo[0]);
    }

    updateMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/update-category/${
        category._id
      }`,
      method: "PUT",
      body: formData,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative"
        style={{ backgroundColor: colors.card }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
          Update Category
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: colors.text }}
            >
              Category Name
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Enter category name"
              className="w-full p-2 rounded border outline-none"
              style={{
                borderColor: colors.bg,
                backgroundColor: colors.bg,
                color: colors.text,
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: colors.text }}
            >
              Upload Photo
            </label>
            <input
              {...register("photo")}
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
              className="block w-full text-sm p-3 rounded"
              style={{ backgroundColor: colors.accent }}
            />
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-3 w-full h-40 object-cover rounded-lg"
              />
            )}
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded shadow-md font-semibold bg-[#344F1F] hover:bg-[#55753b] text-white"
          >
            <FaSave /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryForm;
