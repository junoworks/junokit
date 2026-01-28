import type { LoaderProps } from "../types";
import { defaults, resolveColorValue } from "../types";

export function Spinner(props: LoaderProps) {
	const { size, color, opacity, pause, className = "", style, ...rest } = { ...defaults, ...props };
	const animation = pause ? "" : "animate-spin";

	return (
		<div {...rest} className={`flex items-center justify-center w-fit h-fit ${className}`} style={{ fontSize: size, ...style }}>
			<div
				className={`loader-spinner ${animation}`}
				style={{
					"--loader-color": resolveColorValue(color),
					"--loader-opacity": opacity / 100,
				} as React.CSSProperties}
			>
				<div className="loader-spinner-track" />
			</div>
		</div>
	);
}
