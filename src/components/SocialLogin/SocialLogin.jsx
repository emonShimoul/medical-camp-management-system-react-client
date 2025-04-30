import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleLogin().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };

  return (
    <>
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full border-teal-400 text-teal-600 hover:bg-teal-50"
      >
        <FcGoogle className="text-xl mr-2" /> Sign up with Google
      </button>
    </>
  );
};

export default SocialLogin;
