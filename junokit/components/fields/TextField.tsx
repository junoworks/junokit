import { useId } from "react";
import { Input, InputBox, InputGroup, InputLabel, InputMessage } from "../../base/input";
import type { InputProps } from "../../base/input/Input";
import type { InputColor, InputRadius, InputSize, InputVariant } from "../../base/input/types";

export type TextFieldDataProps = {
	variant?: Exclude<InputVariant, "flat">;
	color?: InputColor;
	size?: InputSize;
	radius?: InputRadius;
	label?: React.ReactNode;
	labelPosition?: "top" | "left";
	icon?: React.ReactElement | undefined;
	rightIcon?: React.ReactElement | undefined;
	prefix?: string;
	suffix?: string;
	inputProps?: InputProps;
	message?: React.ReactNode;
};

export type TextFieldProps = TextFieldDataProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof TextFieldDataProps>;

export const defaults = {
	size: "medium" as const,
	variant: "light" as const,
	color: undefined,
	label: undefined,
	labelPosition: "top" as const,
	message: undefined,
};

export default function TextField(props: TextFieldProps) {
	const {
		size,
		variant,
		color,
		label,
		labelPosition,
		message,
		icon,
		rightIcon,
		prefix,
		suffix,
		radius,
		inputProps,
		className,
		...rest
	} = { ...defaults, ...props };

	const generatedId = useId();
	const inputId = inputProps?.id || generatedId;
	const inputClasses = ["w-full", inputProps?.className].filter(Boolean).join(" ");

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		inputProps?.onFocus?.(e);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		inputProps?.onBlur?.(e);
	};

	return (
		<InputGroup size={size} labelPosition={labelPosition} hasLabel={!!label} className={className} {...rest}>
			{label && (
				<InputLabel size={size} color={color} htmlFor={inputId}>
					{label}
				</InputLabel>
			)}
			<InputBox size={size} variant={variant} color={color} radius={radius}>
				{icon}
				{prefix && <span className="opacity-60 select-none">{prefix}</span>}
				<Input
					{...inputProps}
					id={inputId}
					name={inputProps?.name || inputId}
					variant="unstyled"
					className={inputClasses}
					autoComplete={inputProps?.autoComplete ?? "off"}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
				{suffix && <span className="opacity-60 select-none">{suffix}</span>}
				{rightIcon}
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

TextField.defaults = defaults;
