import { BatterySlash } from "iconoir-react";
import { batteryDeadOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const BatteryCharging = createIcon({
	ionic: batteryDeadOutline,
	iconoir: BatterySlash,
	material: "battery_charging_full",
});
