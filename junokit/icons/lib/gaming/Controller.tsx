import { Gamepad } from "iconoir-react";
import { gameControllerOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Controller = createIcon({
	ionic: gameControllerOutline,
	iconoir: Gamepad,
	material: "stadia_controller",
});
