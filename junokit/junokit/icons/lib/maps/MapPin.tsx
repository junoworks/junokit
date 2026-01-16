import { MapPin as IconoirMapPin } from "iconoir-react";
import { locationOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const MapPin = createIcon({
	ionic: locationOutline,
	iconoir: IconoirMapPin,
	material: "location_on",
});
