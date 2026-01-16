type DividerProps = {
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
		| "transparent";
	direction?: "horizontal" | "vertical";
	thickness?: number;
	length?: "full" | "3/4" | "2/3" | "1/2" | "1/3";
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const defaults = {
	length: "full" as const,
	color: "current/10" as const,
	thickness: 1 as const,
	direction: "horizontal" as const,
	className: "",
	style: {} as React.CSSProperties,
};

function Divider(props: DividerProps) {
	const { length, color, thickness, direction, className, style, ...divProps } = { ...defaults, ...props };

	const sizeStyles = direction === "vertical" ? `h-${length}` : `w-${length}`;

	const classes = `${sizeStyles} ${className}`.trim();

	const horizontalStyles = {
		height: thickness,
		width: "100%",
	};

	const verticalStyles = {
		height: "100%",
		width: thickness,
	};

	const inlineStyles = {
		...(direction === "horizontal" ? horizontalStyles : verticalStyles),
		...style,
	};

	return (
		<div {...divProps} className={classes} style={style}>
			<div style={inlineStyles} className={`bg-${color}`} />
		</div>
	);
}

export default Divider;

Divider.defaults = defaults;
