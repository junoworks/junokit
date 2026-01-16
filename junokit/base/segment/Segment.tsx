import { forwardRef } from "react";
import "./segment.css";

type SegmentSize = "small" | "medium" | "large";
type SegmentVariant = "default" | "solid" | "soft" | "outline";
type SegmentColor = "primary" | "accent";
type SegmentRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export type SegmentProps = {
	children: React.ReactNode;
	type?: "radio" | "checkbox";
	size?: SegmentSize;
	variant?: SegmentVariant;
	color?: SegmentColor;
	radius?: SegmentRadius;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">;

const radiusMap: Record<SegmentRadius, string> = {
	none: "0px",
	sm: "var(--border-radius-sm)",
	md: "var(--border-radius-md)",
	lg: "var(--border-radius-lg)",
	xl: "var(--border-radius-xl)",
	full: "9999px",
};

const Segment = forwardRef<HTMLInputElement, SegmentProps>(
	({ children, type = "radio", size, variant, color, radius, className, id, style, ...inputProps }, ref) => {
		const sizeClass = size ? `juno-segment-${size}` : "";
		const variantClass = variant ? `juno-segment-${variant}` : "";
		const colorClass = color ? `juno-segment-${color}` : "";

		const classes = ["juno-segment", sizeClass, variantClass, colorClass, className].filter(Boolean).join(" ");

		const customStyle = radius
			? ({ "--segment-custom-radius": radiusMap[radius], ...style } as React.CSSProperties)
			: style;

		return (
			<label className={classes} style={customStyle}>
				<input ref={ref} type={type} className="juno-segment-input" {...inputProps} />
				<span className="juno-segment-visual">{children}</span>
			</label>
		);
	},
);

export default Segment;
