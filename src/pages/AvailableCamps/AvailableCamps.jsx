import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaThLarge, FaTh } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AvailableCamps = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/camp");
      return res.data;
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isTwoColumn, setIsTwoColumn] = useState(false);

  if (isLoading)
    return <div className="text-center text-teal-600">Loading...</div>;

  const filteredCamps = camps
    .filter((camp) =>
      camp.campName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "registered")
        return b.participantCount - a.participantCount;
      if (sortOption === "fees") return b.fees - a.fees;
      if (sortOption === "name") return a.campName.localeCompare(b.campName);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-teal-700 mb-8">
        Available Medical Camps
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search camps..."
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-teal-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-teal-500"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="registered">Most Registered</option>
          <option value="fees">Camp Fees</option>
          <option value="name">Alphabetical</option>
        </select>

        <button
          className="flex items-center gap-2 text-teal-600 border border-teal-500 px-4 py-2 rounded-md hover:bg-teal-50 transition"
          onClick={() => setIsTwoColumn(!isTwoColumn)}
        >
          {isTwoColumn ? <FaThLarge /> : <FaTh />}{" "}
          {isTwoColumn ? "3 Columns" : "2 Columns"}
        </button>
      </div>

      {/* Camp Cards */}
      <div
        className={`grid gap-8 ${
          isTwoColumn
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {filteredCamps.map((camp) => (
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
                <span className="font-medium text-teal-600">Fee:</span>{" "}
                {camp.fees}
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
