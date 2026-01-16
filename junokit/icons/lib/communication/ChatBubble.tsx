import { ChatBubble as IconoirChatBubble } from "iconoir-react";
import { chatbubbleEllipsesOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const ChatBubble = createIcon({
	ionic: chatbubbleEllipsesOutline,
	iconoir: IconoirChatBubble,
	material: "sms",
});
