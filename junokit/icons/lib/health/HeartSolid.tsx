import { HeartSolid as IconoirHeartSolid } from "iconoir-react";
import { heart } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const HeartSolid = createIcon({
	ionic: heart,
	iconoir: IconoirHeartSolid,
	material: { name: "favorite", filled: true },
});
