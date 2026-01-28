import type { LoaderProps } from "../types";
import { defaults, resolveColorValue } from "../types";

export function Beat(props: LoaderProps) {
	const { size, color, opacity, pause, className = "", style, ...rest } = { ...defaults, ...props };
	const animation = pause ? "" : "animate-[heartbeat_0.8s_ease-in-out_infinite]";

	return (
		<div {...rest} className={`flex items-center justify-center w-fit h-fit ${className}`} style={{ fontSize: size, ...style }}>
			<span
				className="loader-beat"
				style={{
					"--loader-color": resolveColorValue(color),
					"--loader-opacity": opacity / 100,
				} as React.CSSProperties}
			>
				<span className={`loader-beat-dot ${animation}`} />
			</span>
		</div>
	);
}
