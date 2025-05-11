import { Link, Outlet } from "react-router-dom";
import {
  FaUserEdit,
  FaPlusCircle,
  FaClipboardList,
  FaRegListAlt,
  FaChartBar,
  FaUser,
  FaHistory,
} from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";

const DashboardLayout = () => {
  const [isAdmin] = useAdmin(); // Replace with real auth check

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E293B] p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-[#3B82F6] mb-6 text-center">
          Organizer Panel
        </h2>
        <nav className="space-y-2">
          {!isAdmin ? (
            <>
              <Link
                to="analytics"
                className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-[#334155] transition-colors"
              >
                <FaChartBar className="text-xl text-[#3B82F6]" />
                <span className="text-slate-100 font-medium">Analytics</span>
              </Link>
              <Link
                to="participantProfile"
                className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-[#334155] transition-colors"
              >
                <FaUser className="text-xl text-[#3B82F6]" />
                <span className="text-slate-100 font-medium">
                  Participant Profile
                </span>
              </Link>
              <Link
                to="registeredCamps"
                className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-[#334155] transition-colors"
              >
                <FaRegListAlt className="text-xl text-[#3B82F6]" />
                <span className="text-slate-100 font-medium">
                  Registered Camps
                </span>
              </Link>
              <Link
                to="payment-history"
                className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-[#334155] transition-colors"
              >
                <FaHistory className="text-xl text-[#3B82F6]" />
                <span className="text-slate-100 font-medium">
                  Payment History
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="profile"
                className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-[#334155] transition-colors"
              >
                <FaUserEdit className="text-xl text-[#3B82F6]" />
                <span className="text-slate-100 font-medium">
                  Organizer Profile
                </span>
              </Link>
              <Link
                to="addCamp"
                className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-[#334155] transition-colors"
              >
                <FaPlusCircle className="text-xl text-[#3B82F6]" />
                <span className="text-slate-100 font-medium">Add A Camp</span>
              </Link>
              <Link
                to="manageCamps"
                className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-[#334155] transition-colors"
              >
                <FaClipboardList className="text-xl text-[#afb2b5]" />
                <span className="text-slate-100 font-medium">Manage Camps</span>
              </Link>
              <Link
                to="manageRegisteredCamps"
                className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-[#334155] transition-colors"
              >
                <FaRegListAlt className="text-xl text-[#3B82F6]" />
                <span className="text-slate-100 font-medium">
                  Manage Registered Camps
                </span>
              </Link>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-[#F8FAFC]">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
