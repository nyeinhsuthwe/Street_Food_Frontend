import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "../../hook/useMutation";
import { colors } from "../../constant/color";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

interface UpdateMenuFormProps {
  menu: Inputs;
  onClose: () => void;
}

const UpdateMenu: React.FC<UpdateMenuFormProps> = ({ menu, onClose }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      menu: menu.menu,
      price: menu.price,
      description: menu.description || "",
      category_id: menu.category_id,
      photo: undefined,
    },
  });

  const updateMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });

      onClose();
    },
  });

  const uploadMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      onClose();
    },
  });

  const onSubmit = async (data: Inputs) => {
    const payload = {
      menu: data.menu,
      description: data.description,
      price: data.price,
      category_id: data.category_id,
    };

    updateMutation.mutate({
      endpoint: `${import.meta.env.VITE_API_URL}/update-menu/${menu._id}`,
      method: "PATCH",
      body: payload,
    });

    if (imageFile) {
      const formData = new FormData();
      formData.append("photo", imageFile);
      await uploadMutation.mutateAsync({
        endpoint: `${import.meta.env.VITE_API_URL}/${menu._id}/upload`,
        method: "POST",
        body: formData,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[500px] relative">
        <h2 className="text-xl font-bold mb-4" style={{ color: colors.text }}>
          Update Menu
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            {...register("menu")}
            placeholder="Menu Name"
            className="border p-2 rounded"
          />
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            placeholder="Price"
            className="border p-2 rounded"
          />
          <textarea
            {...register("description")}
            placeholder="Description"
            className="border p-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenu;
