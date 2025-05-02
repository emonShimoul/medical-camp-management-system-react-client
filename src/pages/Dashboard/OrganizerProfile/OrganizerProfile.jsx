import { useState } from "react";

const OrganizerProfile = () => {
  const [organizer, setOrganizer] = useState({
    name: "Dr. John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    image: "https://i.pravatar.cc/150?img=12",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false); // Close the form after updating
    console.log("Updated:", organizer);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-rose-600 mb-4">
        Organizer Profile
      </h2>

      {!isEditing ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={organizer.image}
              alt="Profile"
              className="w-20 h-20 rounded-full ring ring-rose-400"
            />
            <div>
              <p className="text-lg font-medium">{organizer.name}</p>
              <p className="text-gray-500">{organizer.email}</p>
              <p className="text-gray-500">{organizer.phone}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="btn bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 mt-4"
          >
            Update Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="label font-medium">Name</label>
            <input
              className="input input-bordered w-full"
              value={organizer.name}
              onChange={(e) =>
                setOrganizer({ ...organizer, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label font-medium">Email</label>
            <input
              className="input input-bordered w-full"
              value={organizer.email}
              readOnly
            />
          </div>
          <div>
            <label className="label font-medium">Phone</label>
            <input
              className="input input-bordered w-full"
              value={organizer.phone}
              onChange={(e) =>
                setOrganizer({ ...organizer, phone: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label font-medium">Image URL</label>
            <input
              className="input input-bordered w-full"
              value={organizer.image}
              onChange={(e) =>
                setOrganizer({ ...organizer, image: e.target.value })
              }
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="btn bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn btn-outline btn-rose-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default OrganizerProfile;
