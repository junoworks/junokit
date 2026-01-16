import { useId } from "react";
import type { ToggleColor, ToggleProps, ToggleSize, ToggleVariant } from "../../base/check/Toggle";
import Toggle from "../../base/check/Toggle";
import { InputMessage } from "../../base/input";
import type { InputColor } from "../../base/input/types";

export type ToggleFieldDataProps = {
	size?: ToggleSize;
	color?: ToggleColor;
	variant?: ToggleVariant;
	label?: React.ReactNode;
	labelPosition?: "right" | "left";
	message?: React.ReactNode;
	inputProps?: Omit<ToggleProps, "size" | "color" | "variant">;
};

export type ToggleFieldProps = ToggleFieldDataProps &
	Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof ToggleFieldDataProps>;

export const defaults = {
	size: "medium" as ToggleSize,
	label: undefined,
	labelPosition: "right" as const,
	message: undefined,
	variant: "solid" as ToggleVariant,
};

export default function ToggleField(props: ToggleFieldProps) {
	const { size, color, variant, label, labelPosition, message, inputProps, className, ...rest } = {
		...defaults,
		...props,
	};

	const generatedId = useId();
	const inputId = inputProps?.id || generatedId;

	const messageColor = color === "info" ? undefined : (color as InputColor);
	const messageSize = size || "medium";

	const sizeStyles = {
		small: { gapX: "gap-x-1.5", gapY: "gap-y-0.5", text: "text-xs" },
		medium: { gapX: "gap-x-2", gapY: "gap-y-1", text: "text-sm" },
		large: { gapX: "gap-x-3", gapY: "gap-y-1.5", text: "text-base" },
	}[size ?? "medium"];

	const hasLabelOrMessage = label || message;
	const toggleCol = labelPosition === "left" ? "col-start-2" : "col-start-1";
	const labelCol = labelPosition === "left" ? "col-start-1" : "col-start-2";

	const classes = [
		hasLabelOrMessage && "grid items-center grid-cols-[auto_auto]",
		label && message && "grid-rows-[auto_auto]",
		sizeStyles.gapX,
		label && message && sizeStyles.gapY,
		sizeStyles.text,
		className,
	]
		.filter(Boolean)
		.join(" ");

	const messageRow = label ? undefined : "row-start-1";

	return (
		<div {...rest} className={classes}>
			<Toggle
				{...inputProps}
				id={inputId}
				size={size}
				color={color}
				variant={variant}
				className={hasLabelOrMessage ? `row-start-1 ${toggleCol}` : undefined}
			/>
			{label && (
				<label htmlFor={inputId} className={`row-start-1 ${labelCol}`}>
					{label}
				</label>
			)}
			{message && (
				<InputMessage size={messageSize} color={messageColor} className={`${labelCol} ${messageRow ?? ""}`}>
					{message}
				</InputMessage>
			)}
		</div>
	);
}

ToggleField.defaults = defaults;
