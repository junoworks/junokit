import { Attachment as IconoirAttachment } from "iconoir-react";
import { attachOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Attachment = createIcon({
	ionic: attachOutline,
	iconoir: IconoirAttachment,
	material: "attach_file",
});
