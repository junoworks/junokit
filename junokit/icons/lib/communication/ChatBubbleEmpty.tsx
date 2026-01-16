import { ChatBubbleEmpty as IconoirChatBubbleEmpty } from "iconoir-react";
import { chatbubbleOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const ChatBubbleEmpty = createIcon({
	ionic: chatbubbleOutline,
	iconoir: IconoirChatBubbleEmpty,
	material: "chat_bubble_outline",
});
