import { CheckCircleSolid as IconoirCheckCircleSolid } from "iconoir-react";
import { checkmarkCircle } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const CheckCircleSolid = createIcon({
	ionic: checkmarkCircle,
	iconoir: IconoirCheckCircleSolid,
	material: { name: "check_circle", filled: true },
});
