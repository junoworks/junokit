import { useEffect, useId, useState } from "react";
import { Button } from "../..";
import { InputBox, InputGroup, InputLabel, InputMessage } from "../../base/input";
import type { InputColor, InputRadius, InputSize, InputVariant } from "../../base/input/types";
import { Popover, PopoverContent, PopoverTrigger } from "../../base/popover";
import { Calendar, XMark } from "../../icons";
import { formatDisplayDate } from "../fields/utils/dateUtils";
import MiniCalendar from "./MiniCalendar";
import type { CalendarColor } from "./types";

export type DatePickerDataProps = {
	variant?: Exclude<InputVariant, "flat">;
	color?: InputColor;
	size?: InputSize;
	radius?: InputRadius;
	label?: React.ReactNode;
	labelPosition?: "top" | "left";
	message?: React.ReactNode;
	placeholder?: string;
	dateFormat?: string;
	showClearButton?: boolean;
	closeOnSelect?: boolean;
	value?: Date | null;
	id?: string;
};

export type DatePickerProps = DatePickerDataProps & {
	onChange?: (date: Date | null) => void;
	onClear?: () => void;
	inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "size">;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

export const defaults = {
	size: "medium" as const,
	variant: "light" as const,
	color: undefined,
	label: undefined,
	labelPosition: "top" as const,
	message: undefined,
	placeholder: "Select date",
	dateFormat: "dd MMM, yyyy",
	showClearButton: true,
	closeOnSelect: true,
};

export default function DatePicker(props: DatePickerProps) {
	const {
		size,
		variant,
		color,
		radius,
		label,
		labelPosition,
		message,
		placeholder,
		dateFormat,
		showClearButton,
		closeOnSelect,
		value,
		onChange,
		onClear,
		inputProps,
		id,
		...rest
	} = { ...defaults, ...props };

	const generatedId = useId();
	const fieldId = id || generatedId;

	const [selectedDate, setSelectedDate] = useState<Date | null>(value === undefined ? null : value);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setSelectedDate(value === undefined ? null : value);
	}, [value]);

	const handleDateChange = (newDate: Date | null) => {
		setSelectedDate(newDate);
		onChange?.(newDate);
		if (newDate && closeOnSelect) {
			setIsOpen(false);
		}
	};

	const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setSelectedDate(null);
		setIsOpen(false);
		if (onClear) {
			onClear();
		} else {
			onChange?.(null);
		}
	};

	const displayLabel = selectedDate ? formatDisplayDate(selectedDate, dateFormat) : placeholder;
	const isPlaceholder = selectedDate === null;

	const iconSize = {
		small: "16px",
		medium: "20px",
		large: "24px",
	}[size] as string;

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

	const minWidth = {
		small: 140,
		medium: 180,
		large: 220,
	}[size];

	const calendarIcon = <Calendar size={iconSize} />;

	const clearButton = showClearButton && selectedDate && (
		<Button
			icon={<XMark size={iconSize} />}
			size={clearButtonSize}
			variant="ghost"
			onMouseDown={handleClear}
			className={clearButtonOffset}
		/>
	);

	const popoverContentClasses = {
		small: "!p-2 !rounded-sm",
		medium: "!p-3 !rounded-md",
		large: "!p-3 !rounded-lg",
	}[size] as string;

	return (
		<InputGroup size={size} labelPosition={labelPosition} hasLabel={!!label} {...rest}>
			{label && (
				<InputLabel size={size} color={color} htmlFor={fieldId}>
					{label}
				</InputLabel>
			)}
			<Popover size={size} open={isOpen} onOpenChange={setIsOpen}>
				<PopoverTrigger>
					<InputBox
						id={fieldId}
						size={size}
						variant={variant}
						// color={color}
						radius={radius}
						className="cursor-pointer"
						style={{ minWidth }}
					>
						{calendarIcon}
						<span className={`flex-1 select-none ${isPlaceholder ? "opacity-60" : ""}`}>{displayLabel}</span>
						{clearButton}
					</InputBox>
				</PopoverTrigger>
				<PopoverContent className={`${popoverContentClasses} overflow-visible`}>
					<MiniCalendar
						value={selectedDate}
						onChange={handleDateChange}
						size={size === "large" ? "medium" : size}
						inputProps={inputProps}
						color={color as CalendarColor}
					/>
				</PopoverContent>
			</Popover>
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

DatePicker.defaults = defaults;
