import { resolveColor } from "../../utils/colors";

type DotProps = {
	size?: "4px" | "6px" | "8px" | "12px" | "16px";
	color?:
		| "base-0"
		| "base-100"
		| "base-200"
		| "base-300"
		| "base-content"
		| "primary"
		| "accent"
		| "success"
		| "warning"
		| "error"
		| "info"
		| "success-surface"
		| "warning-surface"
		| "error-surface"
		| "info-surface"
		| "current/10"
		| "current/50";
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const defaults = {
	size: "8px" as const,
	color: "base-500" as const,
	className: "",
	style: {} as React.CSSProperties,
};

function Dot(props: DotProps) {
	const { size, color, className, style, ...rest } = {
		...defaults,
		...props,
	};

	const { style: colorStyle } = resolveColor(color, true);
	const inlineStyles = {
		...colorStyle,
		width: size,
		height: size,
		flexShrink: 0,
		borderRadius: "9999px",
		cornerShape: "none" as const,
		...style,
	};
	return <div {...rest} className={`rounded-full squircle-ignore ${className}`} style={inlineStyles} />;
}

export default Dot;

Dot.defaults = defaults;
