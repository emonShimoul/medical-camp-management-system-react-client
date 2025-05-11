import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const COLORS = [
  "#14b8a6",
  "#10b981",
  "#0ea5e9",
  "#facc15",
  "#f97316",
  "#ef4444",
];

const Analytics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: registeredCamps = [], isLoading } = useQuery({
    queryKey: ["analytics", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/registeredCamps?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  const chartData = registeredCamps.map((camp) => ({
    name: camp.campName,
    fees: camp.fees,
    status: camp.paymentStatus,
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 pb-10">
      <h2 className="text-2xl font-bold text-center text-emerald-700 mb-14">
        Your Camp Analytics
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Bar Chart - Camp Fees */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-teal-600">
            Fees per Camp
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="fees" fill="#14b8a6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Payment Status */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-teal-600">
            Payment Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  {
                    name: "Paid",
                    value: chartData.filter((d) => d.status === "paid").length,
                  },
                  {
                    name: "Unpaid",
                    value: chartData.filter((d) => d.status !== "paid").length,
                  },
                ]}
                cx="50%"
                cy="50%"
                label
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
