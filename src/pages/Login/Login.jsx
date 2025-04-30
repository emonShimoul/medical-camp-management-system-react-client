import { Link } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-2xl border border-teal-100">
        <h2 className="text-3xl font-bold text-center text-teal-600">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text text-teal-700">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
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
              placeholder="Your password"
              className="input input-bordered w-full border-teal-300 focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600 border-none"
          >
            Login
          </button>
        </form>

        <div className="divider text-gray-400">OR</div>

        <SocialLogin></SocialLogin>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-teal-600 font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
