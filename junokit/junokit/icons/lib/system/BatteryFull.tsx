import { BatteryFull as IconoirBatteryFull } from "iconoir-react";
import { batteryFullOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const BatteryFull = createIcon({
	ionic: batteryFullOutline,
	iconoir: IconoirBatteryFull,
	material: "battery_full",
});
