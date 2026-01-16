import { useId } from "react";
import type { CheckboxProps, CheckboxVariant, CheckColor, CheckSize } from "../../base/check/Checkbox";
import Checkbox from "../../base/check/Checkbox";
import { InputMessage } from "../../base/input";
import type { InputColor } from "../../base/input/types";

export type CheckboxFieldDataProps = {
	size?: CheckSize;
	color?: CheckColor;
	variant?: CheckboxVariant;
	label?: React.ReactNode;
	labelPosition?: "right" | "left";
	message?: React.ReactNode;
	indeterminate?: boolean;
	inputProps?: Omit<CheckboxProps, "size" | "color" | "variant" | "indeterminate">;
};

export type CheckboxFieldProps = CheckboxFieldDataProps &
	Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof CheckboxFieldDataProps>;

export const defaults = {
	color: undefined as CheckColor,
	variant: "solid" as CheckboxVariant,
	label: undefined,
	labelPosition: "right" as const,
	message: undefined,
	indeterminate: false,
};

export default function CheckboxField(props: CheckboxFieldProps) {
	const { size, color, variant, label, labelPosition, message, indeterminate, inputProps, className, ...rest } = {
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
	const checkboxCol = labelPosition === "left" ? "col-start-2" : "col-start-1";
	const labelCol = labelPosition === "left" ? "col-start-1" : "col-start-2";

	const classes = [
		hasLabelOrMessage && "grid items-center grid-cols-[auto_auto] w-fit",
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
			<Checkbox
				id={inputId}
				size={size}
				color={color}
				variant={variant}
				indeterminate={indeterminate}
				className={hasLabelOrMessage ? `row-start-1 ${checkboxCol}` : undefined}
				{...inputProps}
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

CheckboxField.defaults = defaults;
