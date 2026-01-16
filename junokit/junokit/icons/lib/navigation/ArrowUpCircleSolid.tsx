import { ArrowUpCircleSolid as IconoirArrowUpCircleSolid } from "iconoir-react";
import { arrowUpCircle } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const ArrowUpCircleSolid = createIcon({
	ionic: arrowUpCircle,
	iconoir: IconoirArrowUpCircleSolid,
	material: { name: "arrow_circle_up", filled: true },
});
