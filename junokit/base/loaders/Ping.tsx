import type { LoaderProps } from "./types";
import { defaults, resolveColorValue } from "./types";

export function Ping(props: LoaderProps) {
	const { size, color, opacity, pause, className = "", style, ...rest } = { ...defaults, ...props };
	const animation = pause ? "" : "animate-ping";

	return (
		<div {...rest} className={`flex items-center justify-center w-fit h-fit ${className}`} style={{ fontSize: size, ...style }}>
			<span
				className="loader-ping"
				style={{
					"--loader-color": resolveColorValue(color),
					"--loader-opacity": opacity / 100,
				} as React.CSSProperties}
			>
				<span className={`loader-ping-wave ${animation}`} />
				<span className="loader-ping-dot" />
			</span>
		</div>
	);
}
