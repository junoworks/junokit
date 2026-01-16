import type React from "react";
import type { InputColor, InputSize } from "./types";

type LabelProps = {
	size?: InputSize;
	color?: InputColor;
	children?: React.ReactNode;
} & Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "size" | "color">;

export default function InputLabel({ size = "medium", color, className, children, ...rest }: LabelProps) {
	if (!children) return null;

	const classes = ["juno-input-label", `juno-input-label-${size}`, color && `text-${color}`, className]
		.filter(Boolean)
		.join(" ");

	return (
		<label {...rest} className={classes}>
			{children}
		</label>
	);
}
