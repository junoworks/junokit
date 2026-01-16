import { ReportsSolid as IconoirReportsSolid } from "iconoir-react";
import { barChart } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const ReportsSolid = createIcon({
	ionic: barChart,
	iconoir: IconoirReportsSolid,
	material: { name: "bar_chart", filled: true },
});
