const GenericCard = ({ icon, title, description }) => (
  <div className="bg-gray-50 border rounded-lg p-4 hover:shadow transition">
    <div className="text-3xl">{icon}</div>
    <h3 className="font-semibold text-gray-800 mt-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const Dashboard = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 md:p-8 max-w-4xl mx-auto mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Welcome to Your Dashboard 👋
      </h2>
      <p className="text-gray-600 mb-4">
        Whether you're organizing or attending — everything you need is right
        here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <GenericCard
          icon="📅"
          title="Stay Organized"
          description="Easily access and manage your camp-related activities from your dashboard."
        />
        <GenericCard
          icon="🔔"
          title="Get Updates"
          description="Stay informed with real-time updates, announcements, and important notices."
        />
      </div>
    </div>
  );
};

export default Dashboard;
