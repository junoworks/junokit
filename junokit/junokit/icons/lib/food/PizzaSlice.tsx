import { PizzaSlice as IconoirPizzaSlice } from "iconoir-react";
import { pizzaOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const PizzaSlice = createIcon({
	ionic: pizzaOutline,
	iconoir: IconoirPizzaSlice,
	material: "local_pizza",
});
