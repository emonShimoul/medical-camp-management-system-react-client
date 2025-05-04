import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const CampDetails = () => {
  const camp = useLoaderData();
  console.log(camp);

  const { user } = useAuth();
  //   const axiosSecure = useAxiosSecure(); // Use your secure axios instance
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleJoinCamp = async () => {
    if (!user) {
      return navigate("/login");
    }

    const registrationData = {
      campId: camp._id,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      registeredAt: new Date(),
      campName: camp.campName,
      campImage: camp.image,
      dateTime: camp.dateTime,
      location: camp.location,
      healthcareProfessional: camp.healthcareProfessional,
      fees: camp.fees,
    };

    console.log(registrationData);

    try {
      const res = await axiosPublic.post("/registeredCamps", registrationData);
      if (res.data.insertedId) {
        Swal.fire(
          "Success!",
          "You have successfully joined the camp.",
          "success"
        );
      } else {
        Swal.fire(
          "Warning",
          "You already joined this camp or something went wrong!",
          "warning"
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-teal-100">
        <img
          src={camp.image}
          alt={camp.campName}
          className="w-full h-64 object-cover"
        />
        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold text-teal-700">{camp.campName}</h2>

          <p className="text-gray-600">
            <span className="font-semibold text-teal-600">Date & Time:</span>{" "}
            {camp.dateTime}
          </p>

          <p className="text-gray-600">
            <span className="font-semibold text-teal-600">Location:</span>{" "}
            {camp.location}
          </p>

          <p className="text-gray-600">
            <span className="font-semibold text-teal-600">
              Healthcare Professional:
            </span>{" "}
            {camp.healthcareProfessional}
          </p>

          <p className="text-gray-600">
            <span className="font-semibold text-teal-600">
              Participant Count:
            </span>{" "}
            {camp.participantCount}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold text-teal-600">Fees:</span> $
            {camp.fees}
          </p>

          <p className="text-gray-700 leading-relaxed">{camp.description}</p>

          <button
            onClick={handleJoinCamp}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-md font-semibold hover:from-teal-600 hover:to-emerald-600 transition"
          >
            Join Camp
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampDetails;
