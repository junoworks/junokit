import { ForwardSolid as IconoirForwardSolid } from "iconoir-react";
import { playForward } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const ForwardSolid = createIcon({
	ionic: playForward,
	iconoir: IconoirForwardSolid,
	material: { name: "fast_forward", filled: true },
});
