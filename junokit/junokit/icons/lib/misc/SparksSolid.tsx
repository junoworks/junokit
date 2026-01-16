import { SparksSolid as IconoirSparksSolid } from "iconoir-react";
import { sparkles } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const SparksSolid = createIcon({
	ionic: sparkles,
	iconoir: IconoirSparksSolid,
	material: { name: "auto_awesome", filled: true },
});
