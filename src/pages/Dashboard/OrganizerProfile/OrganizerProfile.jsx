import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { getAuth, updateProfile } from "firebase/auth"; // ✅ Add this

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { app } from "../../../firebase/firebase.config";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const OrganizerProfile = () => {
  const { user } = useAuth();
  const auth = getAuth(app);

  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [organizer, setOrganizer] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/user/profile/${user.email}`).then((res) => {
        setOrganizer(res.data);
        reset({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone || "",
        });
      });
    }
  }, [user, axiosSecure, reset]);

  const onSubmit = async (data) => {
    try {
      let imageURL = organizer.image;
      if (data.image && data.image.length > 0) {
        const imageFile = new FormData();
        imageFile.append("image", data.image[0]);
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: { "content-type": "multipart/form-data" },
        });
        imageURL = res.data?.data?.display_url;
      }

      const updatedData = {
        name: data.name,
        phone: data.phone,
        image: imageURL,
      };

      const res = await axiosSecure.put(
        `/user/profile/${user.email}`,
        updatedData
      );

      if (res.data.modifiedCount > 0) {
        // ✅ Update Firebase Auth profile photo
        await updateProfile(auth.currentUser, {
          displayName: data.name,
          photoURL: imageURL,
        });

        Swal.fire("Updated!", "Your profile has been updated.", "success");
        setShowForm(false);
        setOrganizer({ ...organizer, ...updatedData });
      }
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  if (!organizer) return <Loading />;

  return (
    <div className="max-w-xl mx-auto p-6 shadow-md rounded-xl bg-white mt-8">
      {!showForm ? (
        <>
          <h2 className="text-2xl font-semibold text-teal-600 mb-6">
            Organizer Profile
          </h2>
          <div className="space-y-4 text-gray-800">
            <img
              src={organizer.image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <p>
              <strong>Name:</strong> {organizer.name}
            </p>
            <p>
              <strong>Email:</strong> {organizer.email}
            </p>
            <p>
              <strong>Phone:</strong> {organizer.phone || "Not provided"}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn bg-teal-500 text-white w-full mt-4 hover:bg-teal-600"
            >
              Edit Profile
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-teal-600 mb-6">
            Update Profile
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label text-teal-700">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}
            </div>

            <div>
              <label className="label text-teal-700">Email</label>
              <input
                type="email"
                {...register("email")}
                disabled
                className="input input-bordered w-full bg-gray-100 text-gray-500"
              />
            </div>

            <div>
              <label className="label text-teal-700">Phone</label>
              <input
                type="text"
                {...register("phone")}
                className="input input-bordered w-full"
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label className="label text-teal-700">Upload New Image</label>
              <input
                type="file"
                {...register("image")}
                accept="image/*"
                className="file-input file-input-bordered w-full"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="btn bg-teal-500 text-white w-full hover:bg-teal-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn bg-gray-300 text-gray-700 w-full hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default OrganizerProfile;
