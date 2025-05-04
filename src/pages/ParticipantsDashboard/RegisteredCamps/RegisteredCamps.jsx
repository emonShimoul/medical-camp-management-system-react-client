import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const RegisteredCamps = () => {
  const { user } = useAuth();
  //   const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ["registeredCamps", user.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/registeredCamps?email=${user.email}`);

      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-teal-700 mb-6">
        My Registered Camps
      </h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {camps.map((camp) => (
            <div
              key={camp._id}
              className="bg-white p-4 rounded-lg shadow border"
            >
              <img
                src={camp.campImage}
                alt={camp.campName}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-semibold text-teal-600">
                {camp.campName}
              </h3>
              <p className="text-sm text-gray-600">{camp.dateTime}</p>
              <p className="text-sm text-gray-600">Location: {camp.location}</p>
              <p className="text-sm text-gray-600">Fees: ${camp.fees}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegisteredCamps;
