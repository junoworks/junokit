import { RewindSolid as IconoirRewindSolid } from "iconoir-react";
import { playBack } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const RewindSolid = createIcon({
	ionic: playBack,
	iconoir: IconoirRewindSolid,
	material: { name: "fast_rewind", filled: true },
});
