import { Timer as IconoirTimer } from "iconoir-react";
import { timerOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Timer = createIcon({
	ionic: timerOutline,
	iconoir: IconoirTimer,
	material: "timer",
});
