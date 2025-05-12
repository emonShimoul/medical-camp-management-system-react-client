import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import { Link } from "react-router-dom";

const RegisteredCamps = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: camps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["registeredCamps", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/registeredCamps?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // for feedback
  const { data: feedbacks = [], refetch: refetchFeedbacks } = useQuery({
    queryKey: ["userFeedbacks", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/feedback?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleCancel = async (id, isPaid) => {
    if (isPaid) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosPublic.delete(`/registeredCamps/${id}`);
        refetch();
        Swal.fire(
          "Cancelled!",
          "Your camp registration has been removed.",
          "success"
        );
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", error);
      }
    }
  };

  const handleFeedback = (campId) => {
    Swal.fire({
      title: "Give Feedback",
      html: `
        <label for="feedback-text" class="block text-left mb-1 font-semibold text-sm">Your Feedback:</label>
        <textarea id="feedback-text" class="swal2-textarea" placeholder="Write your feedback here..."></textarea>
        <label for="feedback-rating" class="block text-left mt-3 mb-1 font-semibold text-sm">Rating (1-5):</label>
        <input type="number" id="feedback-rating" class="swal2-input" min="1" max="5" placeholder="Enter rating from 1 to 5">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Submit",
      preConfirm: () => {
        const feedback = document.getElementById("feedback-text").value;
        const rating = parseInt(
          document.getElementById("feedback-rating").value
        );

        if (!feedback || !rating || rating < 1 || rating > 5) {
          Swal.showValidationMessage(
            "Please enter valid feedback and a rating between 1 and 5."
          );
          return false;
        }

        return { feedback, rating };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { feedback, rating } = result.value;
        console.log("Preparing to send feedback...");
        await axiosPublic.post("/feedback", {
          campId,
          feedback,
          rating,
          userEmail: user.email,
        });
        console.log("Feedback POST request sent");
        await refetchFeedbacks();
        Swal.fire("Thank you!", "Your feedback has been submitted.", "success");
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-teal-700 mb-6">
        My Registered Camps
      </h2>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="p-2">Camp Name</th>
                <th className="p-2">Fees</th>
                <th className="p-2">Participant</th>
                <th className="p-2">Payment</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {camps.map((camp) => {
                const hasFeedback = feedbacks.some(
                  (fb) => fb.campId === camp._id
                );

                return (
                  <tr key={camp._id} className="border-b">
                    <td className="p-2">{camp.campName}</td>
                    <td className="p-2">${camp.fees}</td>
                    <td className="p-2">{user?.displayName}</td>
                    <td className="p-2">
                      {camp.paymentStatus === "paid" ? (
                        <span className="text-green-600 font-bold px-2 py-1">
                          Paid
                        </span>
                      ) : (
                        <Link
                          to="/dashboard/payment"
                          state={{
                            campId: camp._id,
                            price: camp.fees,
                            campName: camp.campName,
                          }}
                        >
                          <button className="btn btn-sm bg-amber-500 text-white">
                            Pay
                          </button>
                        </Link>
                      )}
                    </td>
                    <td className="p-2">
                      {camp.confirmationStatus === "confirmed" ? (
                        <span className="text-green-600">Confirmed</span>
                      ) : (
                        <span className="text-gray-500">Pending</span>
                      )}
                    </td>
                    <td className="p-2 space-x-2">
                      <button
                        className="btn btn-sm bg-red-500 text-white disabled:opacity-50"
                        onClick={() =>
                          handleCancel(camp._id, camp.paymentStatus === "paid")
                        }
                        disabled={camp.paymentStatus === "paid"}
                      >
                        Cancel
                      </button>

                      {camp.paymentStatus === "paid" &&
                        camp.confirmationStatus === "confirmed" &&
                        (hasFeedback ? (
                          <span className="text-green-600 font-medium">
                            Feedback Submitted
                          </span>
                        ) : (
                          <button
                            className="btn btn-sm bg-blue-500 text-white"
                            onClick={() => handleFeedback(camp._id)}
                          >
                            Feedback
                          </button>
                        ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RegisteredCamps;
