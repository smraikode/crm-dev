// // import React from "react";
// // import { Radar } from "react-chartjs-2";

// // import {
// //   Chart as ChartJS,
// //   RadialLinearScale,
// //   PointElement,
// //   LineElement,
// //   Filler,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";

// // ChartJS.register(
// //   RadialLinearScale,
// //   PointElement,
// //   LineElement,
// //   Filler,
// //   Tooltip,
// //   Legend
// // );




// // const data = {
// //   labels: ["WhatsApp", "Facebook", "Instagram", "Snapchat"],
// //   datasets: [
// //     {
// //       label: "Social Media Users",
// //       data: [65, 80, 72, 50],
// //       backgroundColor: "rgba(59, 130, 246, 0.2)",
// //       borderColor: "rgba(59, 130, 246, 1)",
// //       borderWidth: 2,
// //       pointBackgroundColor: "rgba(59, 130, 246, 1)",
// //     },
// //   ],
// // };

// // const options = {
// //   scales: {
// //     r: {
// //       angleLines: { display: true },
// //       suggestedMin: 0,
// //       suggestedMax: 100,
// //       ticks: {
// //         stepSize: 20,
// //       },
// //     },
// //   },
// // };

// // const RadarCard = () => {
// //   const values = data.datasets[0].data;
// //   const platforms = data.labels;

// //   return (
// //     <div className="bg-white shadow rounded p-4 w-full max-w-sm">
// //       <h2 className="text-base font-semibold mb-2 text-center">Activity on leads</h2>
// //       <div className="h-60">
// //         <Radar data={data} options={options} />
// //       </div>
// //       <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-700">
// //         {platforms.map((platform, index) => (
// //           <div key={index} className="flex justify-between px-2 py-1 border rounded bg-gray-50">
// //             <span>{platform}</span>
// //             <span className="font-bold">{values[index]}</span>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default RadarCard;



import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { checkUserValid } from "../../CommonUserValidCheck/checkUserValid";

// Register radar chart elements
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Static chart data
const data = {
  labels: ["WhatsApp", "Facebook", "Instagram", "Snapchat"],
  datasets: [
    {
      label: "Social Media Users",
      data: [65, 80, 72, 50],
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      borderColor: "rgba(59, 130, 246, 1)",
      borderWidth: 2,
      pointBackgroundColor: "rgba(59, 130, 246, 1)",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      angleLines: { display: true },
      suggestedMin: 0,
      suggestedMax: 100,
      ticks: {
        stepSize: 20,
        backdropColor: "transparent",
      },
      pointLabels: {
        font: {
          size: 12,
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const RadarCard = () => {
  const navigate = useNavigate();

//   useEffect(() => {
//     checkUserValid(navigate);
//   }, [navigate]);

   useEffect(() => {
      const isValid = checkUserValid();
    if (!isValid) {
      navigate('/login');
    }
  }, [navigate]);

  const values = data.datasets[0].data;
  const platforms = data.labels;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold text-gray-800">Activity on Leads</h2>
        <select className="text-xs border border-gray-300 rounded px-2 py-1 text-gray-700">
          <option value="all">Till Date</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
        </select>
      </div>

      <div className="relative h-60">
        <Radar data={data} options={options} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-700">
        {platforms.map((platform, index) => (
          <div
            key={index}
            className="flex justify-between px-2 py-1 border rounded bg-gray-50"
          >
            <span>{platform}</span>
            <span className="font-bold">{values[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadarCard;

