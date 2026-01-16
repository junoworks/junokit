import { HeadsetSolid as IconoirHeadsetSolid } from "iconoir-react";
import { headset } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const HeadsetSolid = createIcon({
	ionic: headset,
	iconoir: IconoirHeadsetSolid,
	material: { name: "headset", filled: true },
});
