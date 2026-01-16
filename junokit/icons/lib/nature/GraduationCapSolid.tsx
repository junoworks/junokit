import { GraduationCapSolid as IconoirGraduationCapSolid } from "iconoir-react";
import { school } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const GraduationCapSolid = createIcon({
	ionic: school,
	iconoir: IconoirGraduationCapSolid,
	material: { name: "school", filled: true },
});
