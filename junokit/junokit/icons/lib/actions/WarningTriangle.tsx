import { WarningTriangle as IconoirWarningTriangle } from "iconoir-react";
import { warningOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const WarningTriangle = createIcon({
	ionic: warningOutline,
	iconoir: IconoirWarningTriangle,
	material: "warning",
});
