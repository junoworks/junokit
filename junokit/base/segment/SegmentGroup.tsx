import "./segment.css";

type SegmentGroupSize = "small" | "medium" | "large";
type SegmentGroupVariant = "light" | "solid" | "soft";
type SegmentGroupRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export type SegmentGroupProps = {
	children: React.ReactNode;
	size?: SegmentGroupSize;
	variant?: SegmentGroupVariant;
	radius?: SegmentGroupRadius;
	equalWidth?: boolean;
	separators?: boolean;
	disabled?: boolean;
	disableKeyboard?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "disabled">;

const radiusMap: Record<SegmentGroupRadius, string> = {
	none: "0px",
	sm: "var(--border-radius-sm)",
	md: "var(--border-radius-md)",
	lg: "var(--border-radius-lg)",
	xl: "var(--border-radius-xl)",
	full: "9999px",
};

export default function SegmentGroup({
	children,
	size = "medium",
	variant = "light",
	radius,
	equalWidth,
	separators,
	disabled,
	disableKeyboard,
	className,
	style,
	onKeyDown,
	...rest
}: SegmentGroupProps) {
	const sizeClass = `juno-segment-group-${size}`;
	const variantClass = `juno-segment-group-${variant}`;
	const equalWidthClass = equalWidth ? "juno-segment-group-equal" : "";
	const separatorsClass = separators ? "juno-segment-group-separators" : "";
	const disabledClass = disabled ? "juno-segment-group-disabled" : "";

	const classes = [
		"juno-segment-group",
		sizeClass,
		variantClass,
		equalWidthClass,
		separatorsClass,
		disabledClass,
		className,
	]
		.filter(Boolean)
		.join(" ");

	const customStyle = radius ? ({ "--sg-custom-radius": radiusMap[radius], ...style } as React.CSSProperties) : style;

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (disableKeyboard && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
			e.preventDefault();
		}
		onKeyDown?.(e);
	};

	return (
		<div {...rest} role="group" className={classes} style={customStyle} onKeyDown={handleKeyDown}>
			{children}
		</div>
	);
}
