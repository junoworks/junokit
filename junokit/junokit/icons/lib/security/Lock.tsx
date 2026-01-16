import { Lock as IconoirLock } from "iconoir-react";
import { lockClosedOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Lock = createIcon({
	ionic: lockClosedOutline,
	iconoir: IconoirLock,
	material: "lock",
});
