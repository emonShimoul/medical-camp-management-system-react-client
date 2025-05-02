import { Link, Outlet } from "react-router-dom";

const OrganizerDashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-rose-100 to-pink-50 shadow-md p-6">
        <h2 className="text-2xl font-bold text-rose-600 mb-6">
          Organizer Panel
        </h2>
        <nav className="space-y-2">
          <Link
            to="profile"
            className="btn btn-sm w-full text-left text-rose-700"
          >
            Organizer Profile
          </Link>
          <Link
            to="add-camp"
            className="btn btn-sm w-full text-left text-rose-700"
          >
            Add A Camp
          </Link>
          <Link
            to="manage-camps"
            className="btn btn-sm w-full text-left text-rose-700"
          >
            Manage Camps
          </Link>
          <Link
            to="registered-camps"
            className="btn btn-sm w-full text-left text-rose-700"
          >
            Manage Registered Camps
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-rose-50">
        <Outlet />
      </main>
    </div>
  );
};

export default OrganizerDashboardLayout;
