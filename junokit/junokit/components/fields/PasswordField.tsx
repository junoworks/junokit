import { useEffect, useId, useRef, useState } from "react";
import { Button, Input, InputBox, InputGroup, InputLabel, InputMessage } from "../..";
import type { InputProps } from "../../base/input/Input";
import type { InputColor, InputRadius, InputSize, InputVariant } from "../../base/input/types";
import { Check, Eye, EyeClosed, XMark } from "../../icons";
import { DEFAULT_PRESET, getStrength, PASSWORD_PRESETS, type PasswordPreset } from "./utils/passwordUtils";

type PasswordRequirementRowProps = {
	value: string;
	meets: boolean;
	label: string;
};

function PasswordRequirementRow({ value, meets, label }: PasswordRequirementRowProps) {
	const color = value === "" ? "opacity-50" : meets ? "text-success" : "text-warning";
	return (
		<div className={`flex items-center gap-2 text-sm ${color}`}>
			<span>{meets ? <Check /> : <XMark />}</span>
			<span>{label}</span>
		</div>
	);
}

function PasswordStrengthBar({ password, preset = DEFAULT_PRESET }: { password: string; preset?: PasswordPreset }) {
	const requirements = PASSWORD_PRESETS[preset];
	const strength = getStrength(password, preset);
	const fillColor = strength < 33 ? "warning" : strength < 100 ? "error" : "success";
	const fillIndex = Math.floor((strength / 100) * requirements.length);

	function getColor(index: number) {
		if (index < fillIndex) {
			return `bg-${fillColor}`;
		}
		return "bg-current/10";
	}

	return (
		<div className="flex gap-1.5 px-0.5">
			{requirements.map((_, index) => (
				<div key={index} className={`h-1 flex-1 rounded-xs transition-all duration-300 ${getColor(index)}`} />
			))}
		</div>
	);
}

export type PasswordFieldDataProps = {
	variant?: Exclude<InputVariant, "flat">;
	color?: InputColor;
	size?: InputSize;
	radius?: InputRadius;
	label?: React.ReactNode;
	labelPosition?: "top" | "left";
	message?: React.ReactNode;
	validationPreset?: PasswordPreset;
	inputProps?: InputProps & {
		placeholder?: string;
		value?: string;
		defaultValue?: string;
		onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
		onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	};
};

export type PasswordFieldProps = PasswordFieldDataProps &
	Omit<React.HTMLAttributes<HTMLDivElement>, keyof PasswordFieldDataProps>;

export const defaults = {
	size: "medium" as const,
	variant: "light" as const,
	color: undefined,
	label: undefined,
	labelPosition: "top" as const,
	message: undefined,
	validationPreset: undefined,
};

export default function PasswordField(props: PasswordFieldProps) {
	const {
		size,
		variant,
		color,
		radius,
		label,
		labelPosition,
		message,
		validationPreset,
		inputProps,
		className,
		...rest
	} = { ...defaults, ...props };

	const {
		placeholder = "Password",
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

	const [showPassword, setShowPassword] = useState(false);
	const [internalValue, setInternalValue] = useState(controlledValue ?? defaultValue ?? "");
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (controlledValue !== undefined) {
			setInternalValue(controlledValue);
		}
	}, [controlledValue]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setInternalValue(newValue);
		onChange?.(e);
	};

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(true);
		restInputProps.onFocus?.(e);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(false);
		onBlur?.(e);
	};

	const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault(); // Prevent input from losing focus
		const cursorPosition = inputRef.current?.selectionStart || 0;
		setShowPassword(!showPassword);
		setTimeout(() => {
			if (inputRef.current) {
				inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
			}
		}, 0);
	};

	const buttonSize = {
		small: "mini",
		medium: "small",
		large: "medium",
	}[size] as "mini" | "small" | "medium";

	const buttonOffset = {
		small: "-mr-1",
		medium: "-mr-1.5",
		large: "-mr-2",
	}[size];

	const minWidth = {
		small: 140,
		medium: 180,
		large: 220,
	}[size];

	const eyeButton = (
		<Button
			type="button"
			icon={showPassword ? <Eye /> : <EyeClosed />}
			size={buttonSize}
			variant="ghost"
			onMouseDown={togglePassword}
			className={buttonOffset}
			tabIndex={-1}
		/>
	);

	const requirements = validationPreset ? PASSWORD_PRESETS[validationPreset] : null;

	const validationMessage =
		validationPreset && requirements ? (
			<div className="w-full flex flex-col gap-1 mt-1">
				<PasswordStrengthBar password={internalValue} preset={validationPreset} />
				{requirements.map((requirement) => (
					<PasswordRequirementRow
						key={requirement.label}
						value={internalValue}
						meets={requirement.re.test(internalValue)}
						label={requirement.label}
					/>
				))}
			</div>
		) : null;

	const displayMessage = validationMessage || message;

	return (
		<InputGroup {...rest} size={size} labelPosition={labelPosition} hasLabel={!!label} className={className}>
			{label && (
				<InputLabel size={size} color={color} htmlFor={inputId}>
					{label}
				</InputLabel>
			)}
			<InputBox size={size} variant={variant} color={color} radius={radius} style={{ minWidth }}>
				<Input
					ref={inputRef}
					{...restInputProps}
					id={inputId}
					type={showPassword ? "text" : "password"}
					autoComplete={isFocused ? "off" : restInputProps.autoComplete}
					variant="unstyled"
					placeholder={placeholder}
					disabled={disabled}
					value={internalValue}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					className="w-full"
				/>
				{eyeButton}
			</InputBox>
			{displayMessage && (
				<>
					{label && labelPosition === "left" && <div />}
					<InputMessage size={size} color={color}>
						{displayMessage}
					</InputMessage>
				</>
			)}
		</InputGroup>
	);
}

PasswordField.defaults = defaults;
