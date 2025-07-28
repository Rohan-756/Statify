import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js";

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
        borderWidth: 1
      }
    ]
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: 'rgb(125,125,125)', // ← change this to any valid CSS color
            font: {
              size: 14,
            },
          },
        },
      },
  };

  return (
    <div className="w-full h-2xl max-w-2xl mx-auto my-10 flex justify-center">
      <Doughnut data={data} options={options} className="w-full h-auto"/>
    </div>
  );
}
