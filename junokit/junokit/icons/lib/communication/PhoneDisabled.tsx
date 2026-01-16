import { PhoneDisabled as IconoirPhoneDisabled } from "iconoir-react";
import { callOutline } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const PhoneDisabled = createIcon({
	ionic: callOutline,
	iconoir: IconoirPhoneDisabled,
	material: "phone_disabled",
});
