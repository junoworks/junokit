import type { LoaderProps } from "../types";
import { defaults, resolveColorValue } from "../types";

export function Bars(props: LoaderProps) {
	const { size, color, opacity, pause, className = "", style, ...rest } = { ...defaults, ...props };
	const barCount = 8;

	return (
		<div {...rest} className={`flex items-center justify-center w-fit h-fit ${className}`} style={{ fontSize: size, ...style }}>
			<span
				className="loader-bars"
				style={{
					"--loader-color": resolveColorValue(color),
					"--loader-opacity": opacity / 100,
				} as React.CSSProperties}
			>
				{Array.from({ length: barCount }).map((_, i) => (
					<span
						key={i}
						className="loader-bar"
						style={{
							transform: `rotate(${i * (360 / barCount)}deg)`,
							animation: pause ? "none" : `bars-fade 0.8s ease-in-out ${i * (0.8 / barCount)}s infinite`,
						}}
					/>
				))}
			</span>
		</div>
	);
}
