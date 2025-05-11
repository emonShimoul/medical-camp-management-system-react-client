import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: history = [], isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-history?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-teal-700 mb-6">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="p-2">Camp Name</th>
              <th className="p-2">Fees</th>
              <th className="p-2">Transaction ID</th>
              <th className="p-2">Payment Status</th>
              <th className="p-2">Confirmation Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-2">{item.campName}</td>
                <td className="p-2">${item.fees}</td>
                <td className="p-2">{item.transactionId || "N/A"}</td>
                <td className="p-2">
                  <span
                    className={
                      item.paymentStatus === "paid"
                        ? "text-green-600 font-medium"
                        : "text-red-500"
                    }
                  >
                    {item.paymentStatus}
                  </span>
                </td>
                <td className="p-2">
                  <span
                    className={
                      item.confirmationStatus === "confirmed"
                        ? "text-green-600"
                        : "text-gray-500"
                    }
                  >
                    {item.confirmationStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
