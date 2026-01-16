import { Message as IconoirMessage } from "iconoir-react";
import { chatboxOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Message = createIcon({
	ionic: chatboxOutline,
	iconoir: IconoirMessage,
	material: "chat_bubble",
});
