import { SeriesKey } from "../interfaces/iris";
import { Checkbox } from "./Checkbox";

interface CheckboxSeriesGroupProps {
  selectedSeries: SeriesKey[];
  onChange: (series: SeriesKey[]) => void;
}

const AVAILABLE_SERIES: SeriesKey[] = [
  "sepal.width",
  "petal.length",
  "petal.width",
];

const CheckboxSeriesGroup: React.FC<CheckboxSeriesGroupProps> = ({
  selectedSeries,
  onChange,
}) => {
  const handleCheckboxChange = (key: SeriesKey) => {
    const updatedSelection = selectedSeries.includes(key)
      ? selectedSeries.filter((item) => item !== key)
      : [...selectedSeries, key];

    onChange(updatedSelection);
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      {AVAILABLE_SERIES.map((key) => (
        <Checkbox
          key={key}
          label={key}
          checked={selectedSeries.includes(key)}
          onChange={() => handleCheckboxChange(key)}
        />
      ))}
    </div>
  );
};

export default CheckboxSeriesGroup;
