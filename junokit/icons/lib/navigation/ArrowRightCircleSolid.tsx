import { ArrowRightCircleSolid as IconoirArrowRightCircleSolid } from "iconoir-react";
import { arrowForwardCircle } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const ArrowRightCircleSolid = createIcon({
	ionic: arrowForwardCircle,
	iconoir: IconoirArrowRightCircleSolid,
	material: { name: "arrow_circle_right", filled: true },
});
