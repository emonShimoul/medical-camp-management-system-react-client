import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useState } from "react";
import Loading from "../../../components/Loading/Loading";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCamp = () => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    try {
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      console.log(res.data);

      if (res.data.success) {
        const campData = {
          ...data,
          participantCount: 0,
          fees: parseFloat(data.fees),
          dateTime: new Date(data.dateTime),
          image: res.data.data.display_url,
        };
        console.log(campData);
        const campRes = await axiosPublic.post("/camp", campData);
        if (campRes.data.insertedId) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${campData.campName} is added Successfully!!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.error("Camp submission failed", error);
      alert("Failed to add camp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-md rounded-lg">
      {/* While saving camp data */}
      {loading && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4 p-6 bg-white/80 rounded-lg shadow-md">
            <span className="loading loading-spinner loading-lg text-blue-600"></span>
            <p className="text-blue-600 font-medium">Saving camp data...</p>
          </div>
        </div>
      )}

      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Add A Camp
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Camp Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Camp Name
          </label>
          <input
            type="text"
            {...register("campName", { required: "Camp name is required" })}
            className="input input-bordered w-full"
          />
          {errors.campName && (
            <p className="text-red-500 text-sm">{errors.campName.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Image URL
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-ghost"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Fees */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Camp Fees
          </label>
          <input
            type="number"
            {...register("fees", {
              required: "Camp fees are required",
              min: 0,
            })}
            className="input input-bordered w-full"
          />
          {errors.fees && (
            <p className="text-red-500 text-sm">{errors.fees.message}</p>
          )}
        </div>

        {/* Date & Time */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Date & Time
          </label>
          <input
            type="datetime-local"
            {...register("dateTime", {
              required: "Date and time are required",
            })}
            className="input input-bordered w-full"
          />
          {errors.dateTime && (
            <p className="text-red-500 text-sm">{errors.dateTime.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Location
          </label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="input input-bordered w-full"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Healthcare Professional Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Healthcare Professional Name
          </label>
          <input
            type="text"
            {...register("healthcareProfessional", {
              required: "Name is required",
            })}
            className="input input-bordered w-full"
          />
          {errors.healthcareProfessional && (
            <p className="text-red-500 text-sm">
              {errors.healthcareProfessional.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
            rows={4}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn bg-blue-600 text-white hover:bg-blue-700"
          >
            Add Camp
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCamp;
