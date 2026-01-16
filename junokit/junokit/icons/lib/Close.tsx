import { Xmark } from "iconoir-react";
import { closeOutline } from "ionicons/icons";
import { createIcon } from "../createIcon";

export const Close = createIcon({
	ionic: closeOutline,
	iconoir: Xmark,
	material: "close", // Simple string - defaults to outline
});
