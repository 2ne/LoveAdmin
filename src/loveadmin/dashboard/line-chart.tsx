import { FC } from "react";
import { ResponsiveLine, Serie } from "@nivo/line";

interface LineChartProps {
  className?: string;
  data: Serie[]; // This uses the Serie type from @nivo/line which is appropriate for the data prop
  colors: string[]; // Array of color strings
}

const LineChart: FC<LineChartProps> = ({ className, data, colors }) => {
  return (
    <div
      className={`${className} [&_g_g:nth-child(2)_line]:hidden [&_text]:font-body [&_text]:fill-neutral-600 [&_line]:stroke-neutral-200`}
    >
      <div className="flex justify-between mb-4">
        <div>
          <div className="text-lg font-medium text-title">Total sales</div>
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

      <ResponsiveLine
        data={data}
        colors={colors}
        margin={{ top: 10, right: 18, bottom: 38, left: 38 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: 0, max: "auto" }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
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
        }}
        role="application"
      />
    </div>
  );
};

export default LineChart;
