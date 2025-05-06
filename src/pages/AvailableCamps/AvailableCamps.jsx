import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AvailableCamps = () => {
  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/camp");
      return res.data;
    },
  });

  if (isLoading)
    return <div className="text-center text-teal-600">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-teal-700 mb-8">
        Available Medical Camps
      </h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {camps.map((camp) => (
          <div
            key={camp._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border border-teal-100"
          >
            <img
              src={camp.image}
              alt={camp.campName}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-3">
              <h2 className="text-xl font-bold text-teal-700">
                {camp.campName}
              </h2>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-teal-600">Date & Time:</span>{" "}
                {camp.dateTime}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-teal-600">Location:</span>{" "}
                {camp.location}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-teal-600">Doctor:</span>{" "}
                {camp.healthcareProfessional}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-teal-600">Participants:</span>{" "}
                {camp.participantCount}
              </p>
              <p className="text-sm text-gray-600 line-clamp-3">
                {camp.description}
              </p>

              <Link
                to={`/campDetails/${camp._id}`}
                className="inline-block mt-3 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-md text-sm font-semibold hover:from-teal-600 hover:to-emerald-600 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCamps;
