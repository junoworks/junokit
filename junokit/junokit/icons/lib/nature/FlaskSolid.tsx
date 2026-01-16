import { FlaskSolid as IconoirFlaskSolid } from "iconoir-react";
import { flask } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const FlaskSolid = createIcon({
	ionic: flask,
	iconoir: IconoirFlaskSolid,
	material: { name: "science", filled: true },
});
