import { PasteClipboard } from "iconoir-react";
import { clipboardOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Clipboard = createIcon({
	ionic: clipboardOutline,
	iconoir: PasteClipboard,
	material: "content_paste",
});
