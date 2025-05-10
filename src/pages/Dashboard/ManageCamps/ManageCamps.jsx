import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";

const ManageCamps = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/camp")
      .then((res) => {
        setCamps(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching camps:", err);
        setLoading(false);
      });
  }, [axiosSecure]);

  const handleDelete = (campId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This camp will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/delete-camp/${campId}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setCamps(camps.filter((camp) => camp._id !== campId));
              Swal.fire("Deleted!", "Camp has been deleted.", "success");
            }
          })
          .catch((err) => {
            console.error("Error deleting camp:", err);
            Swal.fire("Error!", "Failed to delete camp.", "error");
          });
      }
    });
  };

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-teal-600 mb-4">Manage Camps</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-teal-100 text-teal-700">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date & Time</th>
              <th>Location</th>
              <th>Professional</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp, index) => (
              <tr key={camp._id}>
                <td>{index + 1}</td>
                <td>{camp.campName}</td>
                <td>{formatDateTime(camp.dateTime)}</td>
                <td>{camp.location}</td>
                <td>{camp.healthcareProfessional}</td>
                <td className="space-x-2">
                  <Link
                    to={`/dashboard/update-camp/${camp._id}`}
                    className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(camp._id)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {camps.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-4">
                  No camps found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCamps;
