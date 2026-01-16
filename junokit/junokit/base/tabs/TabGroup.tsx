type TabGroupSize = "small" | "medium" | "large";
type TabGroupVariant = "ghost" | "soft" | "light" | "flat";
type TabGroupColor = "primary" | "accent";
type TabGroupSide = "bottom" | "top" | "left" | "right";

export type TabGroupProps = {
	children: React.ReactNode;
	size?: TabGroupSize;
	variant?: TabGroupVariant;
	color?: TabGroupColor;
	side?: TabGroupSide;
} & React.HTMLAttributes<HTMLDivElement>;

export default function TabGroup({
	children,
	size,
	variant = "ghost",
	color,
	side = "bottom",
	className,
	style,
	...rest
}: TabGroupProps) {
	const sizeClass = size ? `juno-tab-group-${size}` : "";
	const variantClass = `juno-tab-group-${variant}`;
	const sideClass = `juno-tab-group-${side}`;

	const classes = ["juno-tab-group", sizeClass, variantClass, sideClass, className].filter(Boolean).join(" ");

	const customStyle = color ? ({ "--tg-color": `var(--${color})`, ...style } as React.CSSProperties) : style;

	return (
		<div {...rest} role="tablist" className={classes} style={customStyle}>
			{children}
			{(variant === "ghost" || variant === "flat") && <div className="juno-tab-group-line" />}
		</div>
	);
}
