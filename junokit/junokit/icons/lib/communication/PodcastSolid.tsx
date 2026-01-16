import { PodcastSolid as IconoirPodcastSolid } from "iconoir-react";
import { mic } from "ionicons/icons";
import { createIcon } from "../../createIcon";

export const PodcastSolid = createIcon({
	ionic: mic,
	iconoir: IconoirPodcastSolid,
	material: { name: "podcasts", filled: true },
});
