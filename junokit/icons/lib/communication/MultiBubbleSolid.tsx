import { MultiBubbleSolid as IconoirMultiBubbleSolid } from "iconoir-react";
import { chatbubbles } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const MultiBubbleSolid = createIcon({
	ionic: chatbubbles,
	iconoir: IconoirMultiBubbleSolid,
	material: { name: "forum", filled: true },
});
