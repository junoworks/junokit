import type { LoaderProps } from "../types";
import { defaults, resolveColorValue } from "../types";

export function Dots(props: LoaderProps) {
	const { size, color, opacity, pause, className = "", style, ...rest } = { ...defaults, ...props };
	const animation = pause ? "" : "animate-pulse";

	return (
		<div {...rest} className={`flex items-center justify-center w-fit h-fit ${className}`} style={{ fontSize: size, ...style }}>
			<div
				className="loader-dots"
				style={{
					"--loader-color": resolveColorValue(color),
					"--loader-opacity": opacity / 100,
				} as React.CSSProperties}
			>
				<div className={`loader-dot ${animation}`} style={{ animationDuration: "900ms" }} />
				<div className={`loader-dot ${animation}`} style={{ animationDuration: "900ms", animationDelay: "300ms" }} />
				<div className={`loader-dot ${animation}`} style={{ animationDuration: "900ms", animationDelay: "600ms" }} />
			</div>
		</div>
	);
}
