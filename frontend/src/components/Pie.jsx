import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

function Pie({ positive = 0.8, negative = 0.1, neutral = 0.1 }) {
  return (
    <>
      <PieChart
        series={[
          {
            data: [
              {
                id: 0,
                value: positive,
                color: "green",
                label: `POSITIVE(${positive})`,
              },
              {
                id: 1,
                value: negative,
                color: "red",
                label: `NEGATIVE(${negative})`,
              },
              {
                id: 2,
                value: neutral,
                color: "blue",
                label: `NEUTRAL(${neutral})`,
              },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    </>
  );
}
export default React.memo(Pie);
