import { FC } from "react";
import { ResponsiveBar } from "@nivo/bar";

interface BarChartData {
  [key: string]: string | number; // Allows for dynamic keys for indexing and values
}

interface BarChartProps {
  className?: string;
  data: BarChartData[]; // Appropriately typed for @nivo/bar data structure
  colors: string[]; // Array of color strings
  keys: string[]; // Array of key strings
}

const BarChart: FC<BarChartProps> = ({ className, data, colors, keys }) => {
  return (
    <div
      className={`${className} [&_text]:font-body [&_text]:fill-neutral-600 [&_line]:stroke-neutral-200`}
    >
      <div className="flex justify-between mb-4">
        <div>
          <div className="text-lg font-medium text-title">Total revenue</div>
          <div className="text-subtitle">Last month</div>
        </div>
        <div className="grid gap-1 text-right text-subtitle">
          <div className="flex items-center justify-end gap-2">
            <div>Last month</div>
            <div className="w-2.5 h-2.5 rounded-full bg-primary-500 mt-0.5"></div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <div>Previous month</div>
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 mt-0.5"></div>
          </div>
        </div>
      </div>

      <ResponsiveBar
        data={data}
        colors={colors}
        keys={keys}
        borderRadius={4}
        innerPadding={4}
        indexBy="name"
        groupMode="grouped"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A grouped bar chart"
      />
    </div>
  );
};

export default BarChart;
