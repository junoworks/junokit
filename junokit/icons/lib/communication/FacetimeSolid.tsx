import { FacetimeSolid as IconoirFacetimeSolid } from "iconoir-react";
import { videocam } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const FacetimeSolid = createIcon({
	ionic: videocam,
	iconoir: IconoirFacetimeSolid,
	material: { name: "videocam", filled: true },
});
