import { ElectronicsChip } from "iconoir-react";
import { hardwareChipOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Chip = createIcon({
	ionic: hardwareChipOutline,
	iconoir: ElectronicsChip,
	material: "memory",
});
