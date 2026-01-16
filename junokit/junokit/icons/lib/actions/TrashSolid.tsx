import { TrashSolid as IconoirTrashSolid } from "iconoir-react";
import { trash } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const TrashSolid = createIcon({
	ionic: trash,
	iconoir: IconoirTrashSolid,
	material: { name: "delete", filled: true },
});
