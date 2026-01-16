import { WarningTriangleSolid as IconoirWarningTriangleSolid } from "iconoir-react";
import { warning } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const WarningTriangleSolid = createIcon({
	ionic: warning,
	iconoir: IconoirWarningTriangleSolid,
	material: { name: "warning", filled: true },
});
