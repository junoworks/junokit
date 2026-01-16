import { useId, useRef, useState } from "react";
import { Button } from "../..";
import { Input, InputBox, InputGroup, InputLabel, InputMessage } from "../../base/input";
import type { InputProps } from "../../base/input/Input";
import type { InputColor, InputRadius, InputSize, InputVariant } from "../../base/input/types";
import { Add, ChevronLeft, ChevronRight, Minus } from "../../icons";
import { clamp, formatNumber, parseNumber, stepValue } from "./utils/numberUtils";

export type NumberStepperDataProps = {
	variant?: Exclude<InputVariant, "flat">;
	color?: InputColor;
	size?: InputSize;
	radius?: InputRadius;
	label?: React.ReactNode;
	labelPosition?: "top" | "left";
	message?: React.ReactNode;
	icons?: "math" | "arrows";
	inputProps?: InputProps & { min?: number; max?: number; step?: number };
};

export type NumberStepperProps = NumberStepperDataProps &
	Omit<React.HTMLAttributes<HTMLDivElement>, keyof NumberStepperDataProps>;

export const defaults = {
	size: "medium" as const,
	variant: "light" as const,
	color: undefined,
	label: undefined,
	labelPosition: "top" as const,
	message: undefined,
	icons: "math" as const,
};

export default function NumberStepper(props: NumberStepperProps) {
	const { size, variant, color, radius, label, labelPosition, message, icons, inputProps, className, ...rest } = {
		...defaults,
		...props,
	};

	const { min, max, step = 1, value, defaultValue, onChange, onBlur, onKeyDown, ...restInputProps } = inputProps || {};

	const isControlled = typeof value === "number" || (typeof value === "string" && value !== "");

	const [internalValue, setInternalValue] = useState(() => {
		if (typeof defaultValue === "number" || typeof defaultValue === "string") {
			return formatNumber(defaultValue);
		}
		return "";
	});
	const [isEditing, setIsEditing] = useState(false);

	const displayValue = isEditing ? internalValue : isControlled ? formatNumber(value) : internalValue;

	const inputRef = useRef<HTMLInputElement>(null);
	const generatedId = useId();
	const inputId = restInputProps?.id || generatedId;

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsEditing(true);
		setInternalValue(isControlled ? formatNumber(value) : internalValue);
		restInputProps?.onFocus?.(e);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value.replace(/[^0-9.-]/g, "");
		setInternalValue(raw);

		const parsed = parseNumber(raw);
		const syntheticEvent = {
			...e,
			target: { ...e.target, value: parsed?.toString() ?? "" },
		} as React.ChangeEvent<HTMLInputElement>;
		onChange?.(syntheticEvent);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsEditing(false);
		const parsed = parseNumber(internalValue);
		if (parsed !== null) {
			const clamped = clamp(parsed, min, max);
			const formatted = formatNumber(clamped);
			setInternalValue(formatted);
			if (clamped !== parsed) {
				const syntheticEvent = {
					...e,
					target: { ...e.target, value: clamped.toString() },
				} as React.ChangeEvent<HTMLInputElement>;
				onChange?.(syntheticEvent as unknown as React.ChangeEvent<HTMLInputElement>);
			}
		}
		onBlur?.(e);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "ArrowUp") {
			e.preventDefault();
			increment(1);
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			increment(-1);
		}
		onKeyDown?.(e);
	};

	const increment = (direction: 1 | -1) => {
		const current = parseNumber(displayValue) || 0;
		const newValue = stepValue(current, step, direction);
		const clamped = clamp(newValue, min, max);

		if (clamped !== newValue && clamped === current) return;

		const formatted = formatNumber(clamped);
		setInternalValue(formatted);

		if (onChange) {
			const syntheticEvent = {
				target: { value: clamped.toString() },
				currentTarget: { value: clamped.toString() },
			} as React.ChangeEvent<HTMLInputElement>;
			onChange(syntheticEvent);
		}
		inputRef.current?.focus();
	};

	const currentNumericValue = parseNumber(displayValue) || 0;
	const atMin = min !== undefined && currentNumericValue <= min;
	const atMax = max !== undefined && currentNumericValue >= max;

	const buttonSize = { small: "mini", medium: "small", large: "medium" }[size] as "mini" | "small" | "medium";
	const leftOffset = { small: "-ml-1", medium: "-ml-1.5", large: "-ml-2" }[size];
	const rightOffset = { small: "-mr-1", medium: "-mr-1.5", large: "-mr-2" }[size];

	const decrementIcon = icons === "arrows" ? <ChevronLeft /> : <Minus />;
	const incrementIcon = icons === "arrows" ? <ChevronRight /> : <Add />;

	return (
		<InputGroup {...rest} size={size} labelPosition={labelPosition} hasLabel={!!label} className={className}>
			{label && (
				<InputLabel size={size} color={color} htmlFor={inputId}>
					{label}
				</InputLabel>
			)}
			<InputBox size={size} variant={variant} color={color} radius={radius}>
				<Button
					icon={decrementIcon}
					size={buttonSize}
					variant="ghost"
					className={leftOffset}
					disabled={atMin}
					onMouseDown={(e) => {
						e.preventDefault();
						increment(-1);
					}}
					tabIndex={-1}
				/>
				<Input
					{...restInputProps}
					ref={inputRef}
					id={inputId}
					type="text"
					inputMode="decimal"
					variant="unstyled"
					value={displayValue}
					onFocus={handleFocus}
					onChange={handleChange}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					className="text-center w-full"
				/>
				<Button
					icon={incrementIcon}
					size={buttonSize}
					variant="ghost"
					className={rightOffset}
					disabled={atMax}
					onMouseDown={(e) => {
						e.preventDefault();
						increment(1);
					}}
					tabIndex={-1}
				/>
			</InputBox>
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

NumberStepper.defaults = defaults;
