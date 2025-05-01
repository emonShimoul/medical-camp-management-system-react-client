import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createNewUser, updatedUserProfile } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };

    createNewUser(data.email, data.password)
      .then(async (result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        console.log(result.error);

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        if (res.data.success) {
          // now send the data to the server with the image url

          updatedUserProfile(data.name, res.data.data.display_url)
            .then(async () => {
              const registeredUser = {
                name: data.name,
                email: data.email,
                image: res.data.data.display_url,
              };
              const userRes = await axiosPublic.post("/users", registeredUser);
              if (userRes.data.insertedId) {
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `User has been created successfully!!`,
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            })
            .catch((err) => {
              setError({ ...error, registerErr: err.message });
            });
        }
        console.log("with image url", res.data);
      })
      .catch((err) => {
        setError({ ...error, registerErr: err.message });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-white pt-8 pb-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-2xl border border-teal-100">
        <h2 className="text-3xl font-bold text-center text-teal-600">
          Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text text-teal-700">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              {...register("name", { required: true })}
              className="input input-bordered w-full border-teal-300 focus:ring-2 focus:ring-teal-500"
              required
            />
            {errors.name && (
              <span className="font-bold text-red-600">Name is required</span>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text text-teal-700">Email</span>
            </label>
            <input
              type="email"
              placeholder="Your email"
              {...register("email", { required: true })}
              className="input input-bordered w-full border-teal-300 focus:ring-2 focus:ring-teal-500"
              required
            />
            {errors.email && (
              <span className="font-bold text-red-600">Email is required</span>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text text-teal-700">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must be at most 20 characters",
                },
              })}
              name="password"
              className="input"
              placeholder="Password"
            />
            {errors.password && (
              <span className="font-bold text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text text-teal-700">Upload Image</span>
            </label>
            <input
              type="file"
              {...register("image", { required: true })}
              accept="image/*"
              className="file-input file-input-bordered w-full border-teal-300"
            />
          </div>

          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600 border-none"
          >
            Register
          </button>
        </form>
        {error.registerErr && (
          <label
            htmlFor=""
            className="label text-sm text-red-500 font-bold mt-4"
          >
            {error.registerErr}
          </label>
        )}
        <div className="divider text-gray-400">OR</div>

        <SocialLogin></SocialLogin>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-600 font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
