import { forwardRef } from "react";

type TabSize = "small" | "medium" | "large";
type TabVariant = "ghost" | "soft" | "light" | "flat";
type TabColor = "primary" | "accent";

export type TabProps = {
	children: React.ReactNode;
	size?: TabSize;
	variant?: TabVariant;
	color?: TabColor;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">;

const Tab = forwardRef<HTMLInputElement, TabProps>(
	({ children, size, variant, color, className, style, ...inputProps }, ref) => {
		const sizeClass = size ? `juno-tab-${size}` : "";
		const variantClass = variant ? `juno-tab-${variant}` : "";
		const colorClass = color ? `juno-tab-${color}` : "";

		const classes = ["juno-tab", sizeClass, variantClass, colorClass, className].filter(Boolean).join(" ");

		return (
			<label className={classes} style={style}>
				<input ref={ref} type="radio" className="juno-tab-input" {...inputProps} />
				<span className="juno-tab-visual">
					<span className="juno-tab-content">{children}</span>
				</span>
			</label>
		);
	},
);

export default Tab;
