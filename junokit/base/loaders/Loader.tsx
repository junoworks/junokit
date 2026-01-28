import type { LoaderProps } from "./types";
import { defaults } from "./types";
import { Spinner } from "./variants/Spinner";
import { Ping } from "./variants/Ping";
import { TypingDots } from "./variants/TypingDots";
import { Dots } from "./variants/Dots";
import { Beat } from "./variants/Beat";
import { Bars } from "./variants/Bars";
import "./variants/loaders.css";

export type { LoaderProps };

type LoaderWithVariantProps = LoaderProps & {
	variant?: "spin" | "beat" | "ping" | "type" | "dots" | "bars";
};

function LoaderRouter({ variant = "spin", ...props }: LoaderWithVariantProps) {
	switch (variant) {
		case "spin":
			return <Spinner {...props} />;
		case "type":
			return <TypingDots {...props} />;
		case "ping":
			return <Ping {...props} />;
		case "dots":
			return <Dots {...props} />;
		case "beat":
			return <Beat {...props} />;
		case "bars":
			return <Bars {...props} />;
		default:
			return <Spinner {...props} />;
	}
}

// Compound component pattern: Loader.Spinner, Loader.Dots, etc.
export const Loader = Object.assign(LoaderRouter, {
	Spinner,
	Ping,
	TypingDots,
	Dots,
	Beat,
	Bars,
	defaults,
});

export { defaults };
export default Loader;
