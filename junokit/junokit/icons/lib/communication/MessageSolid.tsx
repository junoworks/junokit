import { MessageSolid as IconoirMessageSolid } from "iconoir-react";
import { chatbox } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const MessageSolid = createIcon({
	ionic: chatbox,
	iconoir: IconoirMessageSolid,
	material: { name: "chat_bubble", filled: true },
});
