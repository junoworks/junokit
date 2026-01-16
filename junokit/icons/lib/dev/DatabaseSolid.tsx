import { DatabaseSolid as IconoirDatabaseSolid } from "iconoir-react";
import { server } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const DatabaseSolid = createIcon({
	ionic: server,
	iconoir: IconoirDatabaseSolid,
	material: { name: "database", filled: true },
});
