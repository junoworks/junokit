import { RefreshCircleSolid as IconoirRefreshCircleSolid } from "iconoir-react";
import { refreshCircle } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const RefreshCircleSolid = createIcon({
	ionic: refreshCircle,
	iconoir: IconoirRefreshCircleSolid,
	material: { name: "forward_circle", filled: true },
});
