import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function Graph({
  dateList = [1, 2, 3, 5, 8, 10],
  priceList = [2, 5.5, 2, 8.5, 1.5, 5],
}) {
  return (
    <LineChart
      xAxis={[
        {
          data: [0, 1, 2, 3, 4, 5],
        },
      ]}
      series={[
        {
          data: priceList,
        },
      ]}
      height={350}
      width={500}
      margin={{ left: 50, right: 30, top: 30, bottom: 40 }}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}
