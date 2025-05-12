import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useState } from "react";

const CampDetails = () => {
  const loadedCamp = useLoaderData();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [camp, setCamp] = useState(loadedCamp); // enable UI update
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    phone: "",
    gender: "",
    emergencyContact: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleJoinCamp = () => {
    if (!user) {
      return navigate("/login");
    }
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

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
      ...formData,
    };

    try {
      const res = await axiosPublic.post("/registeredCamps", registrationData);

      if (res.data.insertedId) {
        // ✅ Update local state to reflect UI change
        setCamp((prev) => ({
          ...prev,
          participantCount: prev.participantCount + 1,
        }));

        Swal.fire("Success!", "You have successfully registered.", "success");
        setShowModal(false);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire(
          "Already Registered",
          "You already registered for this camp.",
          "warning"
        );
      } else {
        console.error(error);
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      }
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
            <span className="font-semibold text-teal-600">Fees: </span>
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

      {/* DaisyUI Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg mb-4 text-teal-600">
              Register for {camp.campName}
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <input
                type="text"
                value={camp.campName}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="text"
                value={camp.fees}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="text"
                value={camp.location}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="text"
                value={camp.healthcareProfessional}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="text"
                value={user.displayName}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="email"
                value={user.email}
                readOnly
                className="input input-bordered w-full"
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                required
                className="input input-bordered w-full"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                className="input input-bordered w-full"
                onChange={handleInputChange}
              />
              <select
                name="gender"
                required
                className="select select-bordered w-full"
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <input
                type="text"
                name="emergencyContact"
                placeholder="Emergency Contact"
                required
                className="input input-bordered w-full"
                onChange={handleInputChange}
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampDetails;
