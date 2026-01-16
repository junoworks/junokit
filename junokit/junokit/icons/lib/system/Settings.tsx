import { Settings as IconoirSettings } from "iconoir-react";
import { settingsOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Settings = createIcon({
	ionic: settingsOutline,
	iconoir: IconoirSettings,
	material: "settings",
});
