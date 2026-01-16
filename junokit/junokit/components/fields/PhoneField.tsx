import { useEffect, useId, useRef, useState } from "react";
import { COUNTRIES, COUNTRY_CODES } from "../../assets/countries";
import { Input, InputBox, InputGroup, InputLabel, InputMessage } from "../../base/input";
import type { InputProps } from "../../base/input/Input";
import type { InputColor, InputRadius, InputSize, InputVariant } from "../../base/input/types";
import {
	calculateNewCursorPosition,
	formatPhoneNumber,
	getCountryData,
	unformatPhoneNumber,
	validatePhoneInput,
} from "./utils/phoneUtils";

export type PhoneFieldDataProps = {
	variant?: Exclude<InputVariant, "flat">;
	color?: InputColor;
	size?: InputSize;
	radius?: InputRadius;
	label?: React.ReactNode;
	labelPosition?: "top" | "left";
	message?: React.ReactNode;
	showPrefix?: boolean;
	countryList?: string[];
	inputProps?: InputProps & {
		placeholder?: string;
		value?: string;
		defaultValue?: string;
		onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
		onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	};
};

export type PhoneFieldProps = PhoneFieldDataProps &
	Omit<React.HTMLAttributes<HTMLDivElement>, keyof PhoneFieldDataProps>;

export const defaults = {
	size: "medium" as const,
	variant: "light" as const,
	color: undefined,
	label: undefined,
	labelPosition: "top" as const,
	message: undefined,
	showPrefix: true,
	countryList: COUNTRY_CODES,
};

export default function PhoneField(props: PhoneFieldProps) {
	const {
		size,
		variant,
		color,
		radius,
		label,
		labelPosition,
		message,
		showPrefix,
		countryList,
		inputProps,
		className,
		...rest
	} = { ...defaults, ...props };

	const {
		placeholder,
		value: controlledValue,
		defaultValue,
		onChange,
		onBlur,
		disabled,
		id,
		...restInputProps
	} = inputProps || {};

	const generatedId = useId();
	const inputId = id || generatedId;
	const inputRef = useRef<HTMLInputElement>(null);

	const [selectedCountry, setSelectedCountry] = useState("US");
	const [displayValue, setDisplayValue] = useState("");
	const previousValueRef = useRef<string>("");
	const lastChangeTimeRef = useRef<number>(0);

	const countryData = getCountryData(selectedCountry);
	const prefix = countryData?.phone;

	useEffect(() => {
		const val = controlledValue ?? defaultValue;
		if (val !== undefined) {
			setDisplayValue(formatPhoneNumber(val, selectedCountry));
		}
	}, [controlledValue, defaultValue, selectedCountry]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = validatePhoneInput(e.target.value);
		const previousValue = previousValueRef.current;
		const currentTime = Date.now();

		let rawValue = unformatPhoneNumber(newValue);

		// Detect potential autocomplete and strip country code if present
		const isLikelyAutocomplete =
			previousValue &&
			newValue &&
			((newValue.length > 3 &&
				previousValue.length > 0 &&
				!newValue.startsWith(previousValue) &&
				!previousValue.startsWith(newValue)) ||
				(newValue.length - previousValue.length > 2 && currentTime - lastChangeTimeRef.current < 50));

		if (isLikelyAutocomplete) {
			const countryCode = countryData?.phone.replace("+", "") || "";
			if (countryCode && rawValue.startsWith(countryCode)) {
				rawValue = rawValue.slice(countryCode.length);
			}
		}

		previousValueRef.current = newValue;
		lastChangeTimeRef.current = currentTime;

		const countryCode = countryData?.phone.replace("+", "") || "";
		if (countryCode && rawValue.startsWith(countryCode)) {
			rawValue = rawValue.slice(countryCode.length);
		}

		const formattedValue = formatPhoneNumber(rawValue, selectedCountry);
		const e164Value = `${countryCode}${rawValue}`;

		const cursorPosition = e.target.selectionStart || 0;
		const newCursorPosition = calculateNewCursorPosition(e.target.value, formattedValue, cursorPosition);

		setDisplayValue(formattedValue);

		setTimeout(() => {
			if (inputRef.current) {
				inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
			}
		}, 0);

		if (onChange) {
			const syntheticEvent = {
				...e,
				target: { ...e.target, value: e164Value },
			} as React.ChangeEvent<HTMLInputElement>;
			onChange(syntheticEvent);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (
			!e.ctrlKey &&
			!e.metaKey &&
			!/^[0-9\s\-()]$/.test(e.key) &&
			!["Backspace", "Delete", "Home", "End", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)
		) {
			if (!(e.ctrlKey && ["a", "c", "v", "x"].includes(e.key.toLowerCase()))) {
				e.preventDefault();
			}
		}
	};

	const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newCountry = e.target.value;
		setSelectedCountry(newCountry);
		if (displayValue) {
			const rawValue = unformatPhoneNumber(displayValue);
			setDisplayValue(formatPhoneNumber(rawValue, newCountry));
		}
	};

	const minWidth = {
		small: 180,
		medium: 220,
		large: 260,
	}[size];

	const selectHeight = {
		small: "h-7",
		medium: "h-9",
		large: "h-11",
	}[size];

	const selectPadding = {
		small: "px-1.5",
		medium: "px-2",
		large: "px-2.5",
	}[size];

	const selectRadius = {
		small: "rounded-l-sm",
		medium: "rounded-l-md",
		large: "rounded-l-lg",
	}[size];

	const countries = COUNTRIES.filter((country) => countryList?.includes(country.code));
	const isSingleCountry = countries.length === 1 && countries[0]?.code === selectedCountry;

	const countrySelector = (
		<div
			className={`flex items-center justify-center border border-r-0 border-current/20 bg-current/5 ${selectHeight} ${selectPadding} ${selectRadius}`}
		>
			<select
				className="appearance-none bg-transparent outline-none cursor-pointer disabled:cursor-default"
				value={selectedCountry}
				onChange={handleCountryChange}
				disabled={disabled || isSingleCountry}
			>
				{countries.map((country) => (
					<option key={country.code} value={country.code}>
						{country.flagEmoji}
					</option>
				))}
			</select>
		</div>
	);

	return (
		<InputGroup {...rest} size={size} labelPosition={labelPosition} hasLabel={!!label} className={className}>
			{label && (
				<InputLabel size={size} color={color} htmlFor={inputId}>
					{label}
				</InputLabel>
			)}
			<div className="flex">
				{countrySelector}
				<InputBox
					size={size}
					variant={variant}
					color={color}
					radius={radius}
					className="flex-1 rounded-l-none"
					style={{ minWidth }}
				>
					{showPrefix && prefix && <span className="opacity-60 select-none">{prefix}</span>}
					<Input
						ref={inputRef}
						{...restInputProps}
						id={inputId}
						type="tel"
						variant="unstyled"
						placeholder={placeholder}
						disabled={disabled}
						value={displayValue}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						onBlur={onBlur}
						className="w-full"
					/>
				</InputBox>
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

PhoneField.defaults = defaults;
