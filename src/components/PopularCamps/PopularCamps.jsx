import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const PopularCamps = () => {
  const axiosPublic = useAxiosPublic();

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ["popularCamps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/camp");
      // Sort by participantCount descending and pick top 6
      const sorted = res.data
        .sort((a, b) => b.participantCount - a.participantCount)
        .slice(0, 6);
      return sorted;
    },
  });

  if (isLoading)
    return (
      <div className="text-center text-teal-600">Loading Popular Camps...</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-emerald-700 mb-8">
        Popular Medical Camps
      </h2>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {camps.map((camp) => (
          <div
            key={camp._id}
            className="bg-white shadow-md rounded-xl overflow-hidden border border-emerald-100"
          >
            <img
              src={camp.image}
              alt={camp.campName}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-bold text-emerald-700">
                {camp.campName}
              </h3>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-emerald-600">Fees: </span>
                {camp.fees}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-emerald-600">
                  Date & Time:
                </span>{" "}
                {camp.dateTime}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-emerald-600">
                  Location:
                </span>{" "}
                {camp.location}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-emerald-600">Doctor:</span>{" "}
                {camp.healthcareProfessional}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-emerald-600">
                  Participants:
                </span>{" "}
                {camp.participantCount}
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

      <div className="text-center mt-10">
        <Link
          to="/camps"
          className="inline-block px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 transition"
        >
          See All Camps
        </Link>
      </div>
    </div>
  );
};

export default PopularCamps;
