import { Car as IconoirCar } from "iconoir-react";
import { carOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const Car = createIcon({
	ionic: carOutline,
	iconoir: IconoirCar,
	material: "directions_car",
});
