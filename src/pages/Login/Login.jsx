import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log("Google login clicked");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle form login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-red-100 to-pink-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-2xl border border-red-200">
        <h2 className="text-3xl font-bold text-center text-rose-600">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text text-rose-600">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text text-rose-600">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 border-none"
          >
            Login
          </button>
        </form>

        <div className="divider text-rose-400">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center justify-center gap-2 border-rose-400 text-rose-500 hover:bg-rose-100"
        >
          <FcGoogle className="text-xl" /> Continue with Google
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-rose-600 font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
