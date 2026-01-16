import { useId } from "react";
import { InputGroup, InputLabel, InputMessage } from "../../base/input";
import type { InputColor } from "../../base/input/types";
import type { RadioColor, RadioInputVariant, RadioSize } from "../../base/radio";
import { RadioButton, RadioGroup, RadioItem } from "../../base/radio";

export type RadioOption = {
	value: string;
	label?: string;
	description?: string;
};

export type RadioFieldAppearance = "default" | "button";

export type RadioFieldDataProps = {
	size?: RadioSize;
	color?: RadioColor;
	variant?: RadioInputVariant;
	label?: React.ReactNode;
	labelPosition?: "top" | "left";
	message?: React.ReactNode;
	options: RadioOption[];
	value?: string;
	direction?: "row" | "column";
	appearance?: RadioFieldAppearance;
};

export type RadioFieldProps = RadioFieldDataProps & {
	onChange?: (value: string) => void;
	name?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

export const defaults = {
	size: undefined as RadioSize,
	color: undefined as RadioColor,
	variant: "light" as RadioInputVariant,
	label: undefined,
	labelPosition: "top" as const,
	message: undefined,
	options: [] as RadioOption[],
	direction: "column" as const,
	appearance: "default" as RadioFieldAppearance,
};

export default function RadioField(props: RadioFieldProps) {
	const {
		size,
		color,
		variant,
		label,
		labelPosition,
		message,
		options,
		value,
		direction,
		appearance,
		onChange,
		name,
		className,
		...rest
	} = { ...defaults, ...props };

	const generatedId = useId();
	const groupName = name || generatedId;

	const messageColor = color === "info" ? undefined : (color as InputColor);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	return (
		<InputGroup size={size} labelPosition={labelPosition} hasLabel={!!label} className={className} {...rest}>
			{label && (
				<InputLabel size={size} color={color as InputColor}>
					{label}
				</InputLabel>
			)}
			<RadioGroup size={size} direction={direction}>
				{options.map((option, index) => {
					const radioProps =
						value !== undefined
							? { checked: value === option.value, onChange: handleChange }
							: { defaultChecked: index === 0 };

					if (appearance === "button") {
						const buttonVariant = variant === "native" ? "light" : variant;
						return (
							<RadioButton
								key={option.value}
								name={groupName}
								value={option.value}
								size={size}
								color={color}
								variant={buttonVariant}
								label={option.label}
								description={option.description}
								{...radioProps}
							/>
						);
					}

					return (
						<RadioItem
							key={option.value}
							name={groupName}
							value={option.value}
							size={size}
							color={color}
							variant={variant}
							label={option.label}
							{...radioProps}
						/>
					);
				})}
			</RadioGroup>
			{message && (
				<>
					{label && labelPosition === "left" && <div />}
					<InputMessage size={size} color={messageColor}>
						{message}
					</InputMessage>
				</>
			)}
		</InputGroup>
	);
}

RadioField.defaults = defaults;
