import { Link, Outlet } from "react-router-dom";
import {
  FaUserEdit,
  FaPlusCircle,
  FaClipboardList,
  FaRegListAlt,
  FaChartBar,
  FaUser,
  FaHistory,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import { useState } from "react";

const SidebarLink = ({ to, icon, text, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-[#334155] transition-colors text-white"
  >
    <span className="text-xl text-[#3B82F6]">{icon}</span>
    <span className="font-medium">{text}</span>
  </Link>
);

const DashboardLayout = () => {
  const [isAdmin] = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLinkClick = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#1E293B] p-2 rounded text-white"
        onClick={() => setSidebarOpen(true)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-40 w-64 bg-[#1E293B] p-6 shadow-lg
          min-h-screen transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white text-xl"
          >
            <FaTimes />
          </button>
        </div>

        <Link to="/dashboard" onClick={handleLinkClick}>
          <h2 className="text-2xl font-bold text-[#3B82F6] mb-2 text-center">
            Dashboard
          </h2>
          <Link to="/">
            <p className="text-white underline text-xs mb-4 text-center">
              Back to Website
            </p>
          </Link>{" "}
        </Link>

        <nav className="space-y-2">
          {!isAdmin ? (
            <>
              <SidebarLink
                to="analytics"
                icon={<FaChartBar />}
                text="Analytics"
                onClick={handleLinkClick}
              />
              <SidebarLink
                to="participantProfile"
                icon={<FaUser />}
                text="Participant Profile"
                onClick={handleLinkClick}
              />
              <SidebarLink
                to="registeredCamps"
                icon={<FaRegListAlt />}
                text="Registered Camps"
                onClick={handleLinkClick}
              />
              <SidebarLink
                to="paymentHistory"
                icon={<FaHistory />}
                text="Payment History"
                onClick={handleLinkClick}
              />
            </>
          ) : (
            <>
              <SidebarLink
                to="profile"
                icon={<FaUserEdit />}
                text="Organizer Profile"
                onClick={handleLinkClick}
              />
              <SidebarLink
                to="addCamp"
                icon={<FaPlusCircle />}
                text="Add A Camp"
                onClick={handleLinkClick}
              />
              <SidebarLink
                to="manageCamps"
                icon={<FaClipboardList />}
                text="Manage Camps"
                onClick={handleLinkClick}
              />
              <SidebarLink
                to="manageRegisteredCamps"
                icon={<FaRegListAlt />}
                text="Manage Registered Camps"
                onClick={handleLinkClick}
              />
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-0 p-6 bg-[#F8FAFC]">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
