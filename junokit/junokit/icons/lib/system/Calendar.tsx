import { Calendar as IconoirCalendar } from "iconoir-react";
import { calendarOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Calendar = createIcon({
	ionic: calendarOutline,
	iconoir: IconoirCalendar,
	material: "calendar_today",
});
