import { BatteryEmpty as IconoirBatteryEmpty } from "iconoir-react";
import { batteryDeadOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const BatteryEmpty = createIcon({
	ionic: batteryDeadOutline,
	iconoir: IconoirBatteryEmpty,
	material: "battery_0_bar",
});
