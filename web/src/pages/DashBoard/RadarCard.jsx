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


// import React from "react";
// import { Radar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend
// );

// const data = {
//   labels: ["WhatsApp", "Facebook", "Instagram", "Snapchat"],
//   datasets: [
//     {
//       label: "Social Media Users",
//       data: [65, 80, 72, 50],
//       backgroundColor: "rgba(59, 130, 246, 0.2)",
//       borderColor: "rgba(59, 130, 246, 1)",
//       borderWidth: 2,
//       pointBackgroundColor: "rgba(59, 130, 246, 1)",
//     },
//   ],
// };

// const options = {
//   scales: {
//     r: {
//       angleLines: { display: true },
//       suggestedMin: 0,
//       suggestedMax: 100,
//       ticks: {
//         stepSize: 20,
//       },
//     },
//   },
// };

// const RadarCard = () => {
//   const values = data.datasets[0].data;
//   const platforms = data.labels;

//   return (
//     <div className="bg-white shadow rounded p-4 w-full max-w-sm">
//       {/* Flex container for heading and button */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-base font-semibold">Activity on Leads</h2>
//         <select className="text-xs border border-gray-300 rounded px-2 py-1 outline-none">
//           <option>Till Date</option>
//           <option>Last 7 Days</option>
//           <option>Last 30 Days</option>
//         </select>
//       </div>

//       {/* Radar chart */}
//       <div className="h-60">
//         <Radar data={data} options={options} />
//       </div>

//       {/* Stats */}
//       <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-700">
//         {platforms.map((platform, index) => (
//           <div
//             key={index}
//             className="flex justify-between px-2 py-1 border rounded bg-gray-50"
//           >
//             <span>{platform}</span>
//             <span className="font-bold">{values[index]}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RadarCard;
