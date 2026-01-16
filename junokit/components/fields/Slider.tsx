import { useEffect, useId, useState } from "react";
import { InputGroup, InputLabel, InputMessage } from "../../base/input";
import type { InputColor, InputSize } from "../../base/input/types";
import type { SliderVariant } from "../../base/range/InputRange";
import InputRange, { defaults as inputRangeDefaults } from "../../base/range/InputRange";

type InputRangeProps = React.ComponentProps<typeof InputRange>;

export type SliderDataProps = {
	size?: InputSize;
	color?: InputColor;
	variant?: SliderVariant;
	label?: React.ReactNode;
	labelPosition?: "top" | "left";
	message?: React.ReactNode;
	showValue?: boolean;
	showMinMax?: boolean;
	inputProps?: Omit<InputRangeProps, "size" | "color" | "variant">;
};

export type SliderProps = SliderDataProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof SliderDataProps>;

export const defaults = {
	size: "medium" as InputSize,
	variant: "default" as SliderVariant,
	color: undefined as InputColor,
	label: undefined,
	labelPosition: "top" as const,
	message: undefined,
	showValue: false,
	showMinMax: false,
};

export default function Slider(props: SliderProps) {
	const { size, color, variant, label, labelPosition, message, showValue, showMinMax, inputProps, className, ...rest } =
		{ ...defaults, ...props };

	const generatedId = useId();
	const inputId = inputProps?.id || generatedId;

	const min = inputProps?.min ?? inputRangeDefaults.min;
	const max = inputProps?.max ?? inputRangeDefaults.max;
	const initialValue = inputProps?.value ?? inputProps?.defaultValue ?? inputRangeDefaults.defaultValue;
	const [currentValue, setCurrentValue] = useState(initialValue);

	useEffect(() => {
		setCurrentValue(inputProps?.value ?? inputProps?.defaultValue ?? inputRangeDefaults.defaultValue);
	}, [inputProps?.value, inputProps?.defaultValue]);

	const handleChange = (value: number) => {
		setCurrentValue(value);
		inputProps?.onChange?.(value);
	};

	const textSize = { small: "text-xs", medium: "text-sm", large: "text-base" }[size ?? "medium"];
	const hasLabelRow = label || showValue;

	return (
		<InputGroup size={size} labelPosition={labelPosition} hasLabel={!!label} className={className} {...rest}>
			{hasLabelRow && (
				<div className={`flex items-center justify-between gap-2 ${textSize}`}>
					{label ? (
						<InputLabel size={size} color={color} htmlFor={inputId}>
							{label}
						</InputLabel>
					) : (
						<span />
					)}
					{showValue && <span className="tabular-nums opacity-70">{currentValue}</span>}
				</div>
			)}
			<div className={`flex items-center gap-2 ${textSize}`}>
				{showMinMax && <span className="opacity-50 tabular-nums">{min}</span>}
				<InputRange
					id={inputId}
					size={size}
					variant={variant}
					{...(color && { color })}
					{...inputProps}
					min={min}
					max={max}
					onChange={handleChange}
				/>
				{showMinMax && <span className="opacity-50 tabular-nums">{max}</span>}
			</div>
			{message && (
				<>
					{label && labelPosition === "left" && <div />}
					<InputMessage size={size} color={color}>
						{message}
					</InputMessage>
				</>
			)}
		</InputGroup>
	);
}

Slider.defaults = defaults;
