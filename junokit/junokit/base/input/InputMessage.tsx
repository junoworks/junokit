import type React from "react";
import type { InputColor, InputSize } from "./types";

type InputMessageProps = {
	size?: InputSize;
	color?: InputColor;
	children?: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

export default function InputMessage({ size = "medium", color, className, children, ...rest }: InputMessageProps) {
	if (!children) return null;

	const classes = ["juno-input-message", `juno-input-message-${size}`, color && `text-${color}`, className]
		.filter(Boolean)
		.join(" ");

	return (
		<span className={classes} {...rest}>
			{children}
		</span>
	);
}
