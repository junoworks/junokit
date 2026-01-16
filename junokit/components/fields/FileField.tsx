import { type ChangeEvent, useId, useRef, useState } from "react";
import { Button } from "../..";
import { InputBox, InputGroup, InputLabel, InputMessage } from "../../base/input";
import type { InputColor, InputRadius, InputSize, InputVariant } from "../../base/input/types";
import { XMark } from "../../icons";

export type FileFieldDataProps = {
	variant?: Exclude<InputVariant, "flat">;
	color?: InputColor;
	size?: InputSize;
	radius?: InputRadius;
	label?: React.ReactNode;
	labelPosition?: "top" | "left";
	message?: React.ReactNode;
	icon?: React.ReactElement;
	showClearButton?: boolean;
	inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
		placeholder?: string;
		onChange?: (file: File | null) => void;
	};
};

export type FileFieldProps = FileFieldDataProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof FileFieldDataProps>;

export const defaults = {
	size: "medium" as const,
	variant: "light" as const,
	color: undefined,
	label: undefined,
	labelPosition: "top" as const,
	message: undefined,
	showClearButton: true,
};

export default function FileField(props: FileFieldProps) {
	const {
		size,
		variant,
		color,
		radius,
		label,
		labelPosition,
		message,
		icon,
		showClearButton,
		inputProps,
		className,
		...rest
	} = { ...defaults, ...props };

	const { placeholder, onChange, disabled, id, accept, ...restInputProps } = inputProps || {};

	const generatedId = useId();
	const inputId = id || generatedId;
	const inputRef = useRef<HTMLInputElement>(null);

	const [fileName, setFileName] = useState<string | null>(null);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] ?? null;
		setFileName(file?.name ?? null);
		onChange?.(file);
	};

	const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setFileName(null);
		onChange?.(null);
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	};

	const triggerFilePicker = () => {
		if (!disabled) {
			inputRef.current?.click();
		}
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

	const clearButton = showClearButton && fileName && !disabled && (
		<Button icon={<XMark />} size={buttonSize} variant="ghost" onMouseDown={handleClear} className={buttonOffset} />
	);

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
				onClick={triggerFilePicker}
			>
				{icon}
				<div className={`flex-1 truncate select-none ${fileName ? "" : "opacity-60"}`}>{fileName || placeholder}</div>
				<input
					ref={inputRef}
					{...restInputProps}
					id={inputId}
					type="file"
					accept={accept}
					disabled={disabled}
					onChange={handleFileChange}
					className="absolute inset-0 opacity-0 pointer-events-none"
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

FileField.defaults = defaults;
