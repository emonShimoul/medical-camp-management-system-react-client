import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageRegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ["adminRegisteredCamps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/registeredCamps");
      return res.data;
    },
  });

  const handleConfirm = async (id) => {
    try {
      await axiosSecure.patch(`/registeredCamps/confirm/${id}`);
      Swal.fire("Confirmed!", "Registration has been confirmed.", "success");
      queryClient.invalidateQueries(["adminRegisteredCamps"]);
    } catch {
      Swal.fire("Error", "Failed to confirm.", "error");
    }
  };

  const handleCancel = async (id, isPaid, isConfirmed) => {
    if (isPaid && isConfirmed) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will cancel the registration.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/registeredCamps/${id}`);
        Swal.fire("Cancelled!", "Registration has been removed.", "success");
        queryClient.invalidateQueries(["adminRegisteredCamps"]);
      } catch {
        Swal.fire("Error", "Failed to cancel.", "error");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">
        Manage Registered Camps
      </h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm text-left">
            <thead className="bg-emerald-600 text-white">
              <tr>
                <th className="p-2">Camp Name</th>
                <th className="p-2">Fees</th>
                <th className="p-2">Participant</th>
                <th className="p-2">Payment</th>
                <th className="p-2">Confirmation</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {camps.map((camp) => (
                <tr key={camp._id} className="border-b">
                  <td className="p-2">{camp.campName}</td>
                  <td className="p-2">${camp.fees}</td>
                  <td className="p-2">{camp.userEmail}</td>
                  <td className="p-2">
                    {camp.paymentStatus === "paid" ? (
                      <span className="text-green-600 font-bold">Paid</span>
                    ) : (
                      <span className="text-red-500">Unpaid</span>
                    )}
                  </td>
                  <td className="p-2">
                    {camp.confirmationStatus === "confirmed" ? (
                      <span className="text-green-600 font-semibold">
                        Confirmed
                      </span>
                    ) : (
                      <button
                        className="btn btn-xs bg-blue-500 text-white"
                        onClick={() => handleConfirm(camp._id)}
                      >
                        Pending
                      </button>
                    )}
                  </td>
                  <td className="p-2">
                    <button
                      className="btn btn-xs bg-red-500 text-white disabled:opacity-50"
                      onClick={() =>
                        handleCancel(
                          camp._id,
                          camp.paymentStatus === "paid",
                          camp.confirmationStatus === "confirmed"
                        )
                      }
                      disabled={
                        camp.paymentStatus === "paid" &&
                        camp.confirmationStatus === "confirmed"
                      }
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageRegisteredCamps;
