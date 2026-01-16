import { Trash as IconoirTrash } from "iconoir-react";
import { trashOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Trash = createIcon({
	ionic: trashOutline,
	iconoir: IconoirTrash,
	material: "delete",
});
