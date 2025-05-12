import { FaSuitcaseRolling, FaRegSmile } from "react-icons/fa";
import { BsWater } from "react-icons/bs";
import { PiScrollLight } from "react-icons/pi";

const CampPreparationTips = () => {
  const tips = [
    {
      title: "Pack Light, But Smart",
      description:
        "Bring only the essentials: weather-appropriate clothes, comfortable shoes, toiletries, and your personal ID. Don’t forget a flashlight!",
      icon: <FaSuitcaseRolling className="text-3xl text-emerald-600" />,
    },
    {
      title: "Stay Hydrated",
      description:
        "Always carry a refillable water bottle. Staying hydrated is key to enjoying outdoor activities and avoiding fatigue.",
      icon: <BsWater className="text-3xl text-emerald-600" />,
    },
    {
      title: "Know the Camp Rules",
      description:
        "Make sure to review the rules and guidelines before arriving. Respect nature and fellow campers.",
      icon: <PiScrollLight className="text-3xl text-emerald-600" />,
    },
    {
      title: "Bring a Positive Attitude",
      description:
        "Be ready to meet new people, learn new things, and have fun. A positive mindset makes everything better.",
      icon: <FaRegSmile className="text-3xl text-emerald-600" />,
    },
  ];

  return (
    <section className="px-6 py-10 bg-emerald-50 rounded-xl shadow-md my-10">
      <h2 className="text-3xl font-bold text-center text-emerald-700 mb-8">
        Camp Preparation Tips
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-4">{tip.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {tip.title}
            </h3>
            <p className="text-gray-600">{tip.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CampPreparationTips;
