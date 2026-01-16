import { type ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { Input, InputBox, InputGroup, InputLabel, InputMessage } from "../../base/input";
import type { InputProps } from "../../base/input/Input";
import type { InputColor, InputRadius, InputSize, InputVariant } from "../../base/input/types";
import { Calendar, XMark } from "../../icons";
import { formatDateForInput, formatDisplayDate, normalizeValue } from "./utils/dateUtils";

export type DateFieldDataProps = {
	variant?: Exclude<InputVariant, "flat">;
	color?: InputColor;
	size?: InputSize;
	radius?: InputRadius;
	label?: React.ReactNode;
	labelPosition?: "top" | "left";
	message?: React.ReactNode;
	dateFormat?: string;
	showClearButton?: boolean;
	inputProps?: InputProps & {
		placeholder?: string;
		value?: Date | string | null;
		onChange?: (date: Date | null) => void;
		onClear?: () => void;
	};
};

export type DateFieldProps = DateFieldDataProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof DateFieldDataProps>;

export const defaults = {
	size: "medium" as const,
	variant: "light" as const,
	color: undefined,
	label: undefined,
	labelPosition: "top" as const,
	message: undefined,
	dateFormat: "dd MMM, yyyy",
	showClearButton: true,
};

export default function DateField(props: DateFieldProps) {
	const {
		size,
		variant,
		color,
		radius,
		label,
		labelPosition,
		message,
		dateFormat,
		showClearButton,
		inputProps,
		className,
		...rest
	} = { ...defaults, ...props };

	const { placeholder, value, onChange, onClear, disabled, id, ...restInputProps } = inputProps || {};

	const generatedId = useId();
	const inputId = id || generatedId;
	const inputRef = useRef<HTMLInputElement>(null);
	const [selectedDate, setSelectedDate] = useState<Date | null>(normalizeValue(value));

	useEffect(() => {
		setSelectedDate(normalizeValue(value));
	}, [value]);

	const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
		const dateValue = event.target.value;
		if (dateValue) {
			const newDate = new Date(`${dateValue}T00:00:00`);
			setSelectedDate(newDate);
			onChange?.(newDate);
		} else {
			setSelectedDate(null);
			onChange?.(null);
		}
	};

	const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setSelectedDate(null);
		if (onClear) {
			onClear();
		} else {
			onChange?.(null);
		}
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	};

	const triggerDatePicker = () => {
		if (!disabled) {
			inputRef.current?.showPicker();
		}
	};

	const iconSize = {
		small: "16px",
		medium: "20px",
		large: "24px",
	}[size] as string;

	const calendarIcon = (
		<Calendar
			size={iconSize}
			className="cursor-pointer hover:scale-105 transition-transform"
			onClick={triggerDatePicker}
		/>
	);

	/* 
	alternative clear button implementation
	const clearButtonSize = {
		small: "mini",
		medium: "small",
		large: "medium",
	}[size] as "mini" | "small" | "medium";

	const clearButtonOffset = {
		small: "-mr-1",
		medium: "-mr-1.5",
		large: "-mr-2",
	}[size];
	const clearButton = showClearButton && selectedDate && !disabled && (
		<Button
			icon={<XMark />}
			size={clearButtonSize}
			variant="ghost"
			onMouseDown={handleClear}
			className={clearButtonOffset}
		/>
	); */

	const clearButton = showClearButton && selectedDate && !disabled && (
		<XMark
			onMouseDown={(e) => handleClear(e as React.MouseEvent<HTMLButtonElement>)}
			className="cursor-pointer scale-90 hover:scale-125 transition-transform"
		/>
	);

	const minWidth = {
		small: 140,
		medium: 180,
		large: 220,
	}[size];

	return (
		<InputGroup {...rest} size={size} labelPosition={labelPosition} hasLabel={!!label} className={className}>
			{label && (
				<InputLabel size={size} color={color} htmlFor={inputId}>
					{label}
				</InputLabel>
			)}
			<InputBox
				size={size}
				variant={variant}
				color={color}
				radius={radius}
				className="cursor-pointer"
				style={{ minWidth }}
				onClick={triggerDatePicker}
			>
				{calendarIcon}
				<div className={`flex-1 select-none ${selectedDate ? "" : "opacity-60"}`}>
					{selectedDate ? formatDisplayDate(selectedDate, dateFormat) : placeholder}
				</div>
				<Input
					ref={inputRef}
					{...restInputProps}
					id={inputId}
					type="date"
					variant="unstyled"
					disabled={disabled}
					value={formatDateForInput(value ?? selectedDate)}
					onChange={handleDateChange}
					className="absolute inset-0 opacity-0 cursor-pointer"
				/>
				{clearButton}
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

DateField.defaults = defaults;
