import { forwardRef } from "react";
import type { InputColor, InputRadius, InputSize, InputVariant } from "./types";

export type TextAreaProps = {
	size?: InputSize;
	variant?: InputVariant;
	color?: InputColor;
	radius?: InputRadius;
	resize?: "vertical" | "horizontal" | "both";
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">;

const defaults = {
	size: "medium" as const,
	variant: "light" as const,
	color: undefined,
	resize: undefined,
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
	const { size, variant, color, radius, resize, className, style, ...rest } = { ...defaults, ...props };

	const classes = [
		"juno-input",
		"juno-textarea",
		`juno-input-${size}`,
		`juno-input-${variant}`,
		color && `juno-input-color-${color}`,
		radius && `rounded-${radius}`,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<textarea
			{...rest}
			ref={ref}
			rows={props.rows}
			className={classes}
			style={
				{
					resize,
					fieldSizing: props.rows ? "fixed" : "content",
					...style,
				} as React.CSSProperties
			}
		/>
	);
});

const TextAreaWithDefaults = TextArea as typeof TextArea & {
	defaults: typeof defaults;
};
TextAreaWithDefaults.defaults = defaults;

export default TextAreaWithDefaults;
