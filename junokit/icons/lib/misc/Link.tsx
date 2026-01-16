import { Link as IconoirLink } from "iconoir-react";
import { linkOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Link = createIcon({
	ionic: linkOutline,
	iconoir: IconoirLink,
	material: "link",
});
