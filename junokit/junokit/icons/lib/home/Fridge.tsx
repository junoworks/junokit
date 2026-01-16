import { Fridge as IconoirFridge } from "iconoir-react";
import { restaurantOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Fridge = createIcon({
	ionic: restaurantOutline,
	iconoir: IconoirFridge,
	material: "kitchen",
});
