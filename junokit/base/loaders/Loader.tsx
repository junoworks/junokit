import type { LoaderProps } from "./types";
import { defaults } from "./types";
import { Spinner } from "./Spinner";
import { Ping } from "./Ping";
import { TypingDots } from "./TypingDots";
import { Dots } from "./Dots";
import { Beat } from "./Beat";
import { Bars } from "./Bars";
import "./loaders.css";

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
