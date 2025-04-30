import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleGoogleSignup = () => {
    // Google signup logic
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
          </div>

          <div>
            <label className="label">
              <span className="label-text text-teal-700">Password</span>
            </label>
            <input
              type="password"
              placeholder="Create password"
              {...register("password", { required: true })}
              className="input input-bordered w-full border-teal-300 focus:ring-2 focus:ring-teal-500"
              required
            />
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

        <div className="divider text-gray-400">OR</div>

        <button
          onClick={handleGoogleSignup}
          className="btn btn-outline w-full border-teal-400 text-teal-600 hover:bg-teal-50"
        >
          <FcGoogle className="text-xl mr-2" /> Sign up with Google
        </button>

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
