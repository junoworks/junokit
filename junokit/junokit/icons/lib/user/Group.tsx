import { Group as IconoirGroup } from "iconoir-react";
import { peopleOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Group = createIcon({
	ionic: peopleOutline,
	iconoir: IconoirGroup,
	material: "group",
});
