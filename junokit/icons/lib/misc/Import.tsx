import { Import as IconoirImport } from "iconoir-react";
import { logInOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Import = createIcon({
	ionic: logInOutline,
	iconoir: IconoirImport,
	material: "file_download",
});
