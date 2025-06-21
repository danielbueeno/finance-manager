"use client";

interface CustomTooltipPayload {
  name: string;
  value: number;
  dataKey: string;
  color?: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: CustomTooltipPayload[]; // or string, depending on your data
  label?: string;
  isFuture?: boolean;
}

const ChartTooltip = ({
  active,
  payload,
  label,
  isFuture,
}: ChartTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white border rounded p-2 shadow text-sm">
      <p className="font-semibold">{label}</p>
      {isFuture && (
        <p className="text-purple-600">Prediction based on default</p>
      )}
      {payload.map((item) => (
        <p key={item.dataKey}>
          {item.name}: <span className="font-medium">{item.value}</span>
        </p>
      ))}
    </div>
  );
};

export default ChartTooltip;
