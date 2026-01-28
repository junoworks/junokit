import type { LoaderProps } from "../types";
import { defaults, resolveColorValue } from "../types";

export function TypingDots(props: LoaderProps) {
	const { size, color, opacity, pause, className = "", style, ...rest } = { ...defaults, ...props };
	const animation = pause ? "" : "animate-[typing-bounce_0.6s_ease-in-out_infinite]";

	return (
		<div {...rest} className={`flex items-center justify-center w-fit h-fit ${className}`} style={{ fontSize: size, ...style }}>
			<div
				className="loader-dots"
				style={{
					"--loader-color": resolveColorValue(color),
					"--loader-opacity": opacity / 100,
				} as React.CSSProperties}
			>
				<div className={`loader-dot ${animation}`} />
				<div className={`loader-dot ${animation}`} style={{ animationDelay: "150ms" }} />
				<div className={`loader-dot ${animation}`} style={{ animationDelay: "300ms" }} />
			</div>
		</div>
	);
}
