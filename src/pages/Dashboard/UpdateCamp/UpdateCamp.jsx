import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const UpdateCamp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axiosSecure.get(`/camp/${id}`).then((res) => {
      const camp = res.data;
      reset({
        campName: camp.campName,
        dateTime: new Date(camp.dateTime).toISOString().slice(0, 16),
        location: camp.location,
        healthcareProfessional: camp.healthcareProfessional,
      });
      setLoading(false);
    });
  }, [axiosSecure, id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const updatedData = {
        campName: data.campName,
        dateTime: new Date(data.dateTime),
        location: data.location,
        healthcareProfessional: data.healthcareProfessional,
      };

      const res = await axiosSecure.put(`/camp/${id}`, updatedData);

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Camp updated successfully!", "success");
        navigate("/dashboard/manageCamps");
      }
    } catch (err) {
      console.error("Update failed", err);
      Swal.fire("Error", "Failed to update camp", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-2xl mx-auto mt-6 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-teal-600 mb-6">
        Update Camp
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Camp Name */}
        <div>
          <label className="block mb-1 font-medium">Camp Name</label>
          <input
            type="text"
            {...register("campName", { required: "Camp name is required" })}
            className="input input-bordered w-full"
          />
          {errors.campName && (
            <p className="text-red-500">{errors.campName.message}</p>
          )}
        </div>

        {/* Date & Time */}
        <div>
          <label className="block mb-1 font-medium">Date & Time</label>
          <input
            type="datetime-local"
            {...register("dateTime", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.dateTime && (
            <p className="text-red-500">Date & time is required</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="input input-bordered w-full"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>

        {/* Healthcare Professional */}
        <div>
          <label className="block mb-1 font-medium">
            Healthcare Professional
          </label>
          <input
            type="text"
            {...register("healthcareProfessional", {
              required: "Professional name is required",
            })}
            className="input input-bordered w-full"
          />
          {errors.healthcareProfessional && (
            <p className="text-red-500">
              {errors.healthcareProfessional.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button className="btn bg-teal-600 text-white hover:bg-teal-700">
            Update Camp
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCamp;
