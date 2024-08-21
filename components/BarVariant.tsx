import { format } from "date-fns";
import {
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";

type BarVariantProps = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const BarVariant = ({ data }: BarVariantProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{
            fontSize: "12px",
          }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="income" fill="#3B82F6" className="drop-shadow-sm" />
        <Bar dataKey="expenses" fill="#F43F5E" className="drop-shadow-sm" />
      </BarChart>
    </ResponsiveContainer>
  );
};
