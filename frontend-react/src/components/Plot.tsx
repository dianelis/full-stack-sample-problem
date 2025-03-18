import { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import RangeSlider from "react-range-slider-input";

import "react-range-slider-input/dist/style.css";

import { IrisData, SeriesKey } from "../interfaces/iris";

import CheckboxSeriesGroup from "./CheckboxSeriesGroup";

interface PlotProps {
  data: IrisData[];
  xAxisKey: "sepal.length" | "petal.length";
}

const COLORS: Record<SeriesKey, string> = {
  "sepal.width": "blue",
  "petal.length": "red",
  "petal.width": "green",
};

const Plot: React.FC<PlotProps> = ({ data, xAxisKey }) => {
  const [yBounds, setYBounds] = useState<[number, number]>([0, 10]);
  const [selectedSeries, setSelectedSeries] = useState<SeriesKey[]>([
    "sepal.width",
    "petal.length",
    "petal.width",
  ]);

  return (
    <div>
      <div className="flex flex-col items-center">
        <RangeSlider
          className="max-w-80 mb-6"
          min={0}
          max={10}
          value={yBounds}
          onInput={setYBounds}
        />
        <CheckboxSeriesGroup
          selectedSeries={selectedSeries}
          onChange={setSelectedSeries}
        />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="number" dataKey={xAxisKey} name={xAxisKey} />
          <YAxis type="number" domain={yBounds} name="Size" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />

          {selectedSeries.map((key) => (
            <Scatter
              key={key}
              name={key}
              data={data}
              fill={COLORS[key]}
              dataKey={key}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Plot;
