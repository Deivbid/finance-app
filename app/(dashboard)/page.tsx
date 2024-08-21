import { DataCharts } from "@/components/DataCharts";
import { DataGrid } from "@/components/DataGrid";

export default function DashboardPage() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 px-4 py-6  lg:px-14">
      <DataGrid />
      <DataCharts />
    </div>
  );
}
