import { monthList } from "./categoryList";

export const getStartEndPoint = (startDate, selectedMonth = null) => {
  const date = new Date();
  let currentMonth = date.getMonth();
  const currentDate = date.getDate();
  const currentYear = date.getFullYear();

  if (selectedMonth) {
    currentMonth = selectedMonth;
  }

  let startPoint = "",
    endPoint = "";

  if (currentDate <= startDate) {
    startPoint = `${monthList[currentMonth - 1]}-${startDate}, ${currentYear}`;
    endPoint = `${monthList[currentMonth]}-${startDate}, ${currentYear}`;
  } else {
    startPoint = `${monthList[currentMonth]}-${startDate}, ${currentYear}`;
    endPoint = `${monthList[currentMonth + 1]}-${startDate}, ${currentYear}`;
  }
  return { startPoint, endPoint };
};

export const getGraphData = (labels, graphData) => {
  return {
    labels: labels,
    datasets: [
      {
        label: "Amount spent",
        data: graphData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderWidth: 4,
      },
    ],
  };
};
export const graphOptions = {
  plugins: {
    legend: {
      position: "right",
      align: "middle",
    },
    datalabels: {
      formatter: (value, ctx) => {
        let sum = 0;
        let dataArr = ctx.chart.data.datasets[0].data;
        dataArr.map((data) => (sum += data));
        let percentage = ((value * 100) / sum).toFixed(2);
        if (percentage < 3) {
          return "";
        }
        return `${percentage}%`;
      },
      color: "#000",
    },
  },
};
