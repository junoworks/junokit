import { InfoCircleSolid as IconoirInfoCircleSolid } from "iconoir-react";
import { informationCircle } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const InfoCircleSolid = createIcon({
	ionic: informationCircle,
	iconoir: IconoirInfoCircleSolid,
	material: { name: "info", filled: true },
});
