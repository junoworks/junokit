import { ArrowDownCircleSolid as IconoirArrowDownCircleSolid } from "iconoir-react";
import { arrowDownCircle } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const ArrowDownCircleSolid = createIcon({
	ionic: arrowDownCircle,
	iconoir: IconoirArrowDownCircleSolid,
	material: { name: "arrow_circle_down", filled: true },
});
