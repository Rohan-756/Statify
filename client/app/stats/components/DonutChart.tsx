// import { Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   ChartOptions
// } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// type Props = {
//   genreCount: Record<string, number>;
// };

// export default function DonutChart({ genreCount }: Props) {
//   const sorted = Object.entries(genreCount)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 10);

//   const labels = sorted.map(([genre]) => genre);
//   const values = sorted.map(([, count]) => count);

//   const data = {
//     labels,
//     datasets: [
//       {
//         data: values,
//         backgroundColor: [
//           "#1DB954", "#FF6384", "#36A2EB", "#FFCE56",
//           "#9966FF", "#FF9F40", "#4BC0C0", "#C9CBCF",
//           "#8E44AD", "#2ECC71"
//         ],
//         borderWidth: 1
//       }
//     ]
//   };

//   const options: ChartOptions<"doughnut"> = {
//     responsive: true,
//     maintainAspectRatio: false,
//     cutout: "60%",
//     plugins: {
//         legend: {
//           position: 'bottom',
//           labels: {
//             color: 'rgb(125,125,125)', // ← change this to any valid CSS color
//             font: {
//               size: 14,
//             },
//           },
//         },
//       },
//   };

//   return (
//     <div className="w-full h-2xl max-w-2xl mx-auto my-10 flex justify-center">
//       <Doughnut data={data} options={options} className="w-full h-auto"/>
//     </div>
//   );
// }


/* SEo */

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js";
import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  genreCount: Record<string, number>;
};

export default function DonutChart({ genreCount }: Props) {
  const sorted = Object.entries(genreCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const labels = sorted.map(([genre]) => genre);
  const values = sorted.map(([, count]) => count);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#1DB954", "#FF6384", "#36A2EB", "#FFCE56",
          "#9966FF", "#FF9F40", "#4BC0C0", "#C9CBCF",
          "#8E44AD", "#2ECC71"
        ],
        borderWidth: 2,
        borderColor: "#ffffff", // white borders for cleaner separation
        hoverOffset: 12 // makes slices "pop" on hover
      }
    ]
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%", // slightly bigger hole for modern look
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "rgb(125,125,125)",
          font: {
            size: 14,
            family: "'Inter', sans-serif"
          },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: "#1f2937", // dark gray tooltip background
        titleColor: "#fff",
        bodyColor: "#d1d5db",
        padding: 12,
        cornerRadius: 8
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-10 flex flex-col items-center">
      {/* Visible heading for users */}
      <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
        Top 10 Genres
      </h2>

      {/* Accessible heading for SEO (hidden visually) */}
      <h2 className="sr-only">Top 10 Music Genres by Play Count</h2>

      {/* Chart */}
      <div className="relative w-full h-[400px]">
        <Doughnut data={data} options={options} />
      </div>

      {/* SEO & accessibility fallback */}
      <div className="sr-only">
        <p>Top 10 music genres by play count:</p>
        <ul>
          {sorted.map(([genre, count]) => (
            <li key={genre}>
              {genre}: {count} plays
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

