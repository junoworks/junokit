import { Parking as IconoirParking } from "iconoir-react";
import { carOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Parking = createIcon({
	ionic: carOutline,
	iconoir: IconoirParking,
	material: "local_parking",
});
