import { ChatBubbleCheck } from "iconoir-react";
import { chatbubbleEllipsesOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const ChatBubbleSolid = createIcon({
	ionic: chatbubbleEllipsesOutline,
	iconoir: ChatBubbleCheck,
	material: { name: "sms", filled: true },
});
