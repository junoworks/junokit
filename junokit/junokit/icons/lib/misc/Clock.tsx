import { Clock as IconoirClock } from "iconoir-react";
import { timeOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Clock = createIcon({
	ionic: timeOutline,
	iconoir: IconoirClock,
	material: "schedule",
});
