import { ArrowLeftCircleSolid as IconoirArrowLeftCircleSolid } from "iconoir-react";
import { arrowBackCircle } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const ArrowLeftCircleSolid = createIcon({
	ionic: arrowBackCircle,
	iconoir: IconoirArrowLeftCircleSolid,
	material: { name: "arrow_circle_left", filled: true },
});
