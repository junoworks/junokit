import { useEffect, useId, useState } from "react";
import { SelectBox, SelectOption } from "../..";
import { DirectionalButton } from "../../";
import type { ButtonSize } from "../../base/button/types";
import { InputGroup, InputLabel, InputMessage } from "../../base/input";
import type { InputColor, InputRadius, InputSize, InputVariant } from "../../base/input/types";
import { Popover, PopoverContent, PopoverTrigger } from "../../base/popover";
import { useSelectKeyboard } from "./utils/useSelectKeyboard";

export type Option = {
	value: string | number;
	label?: string;
};

export type StepperArrayDataProps = {
	variant?: Exclude<InputVariant, "flat">;
	color?: InputColor;
	size?: InputSize;
	radius?: InputRadius;
	label?: React.ReactNode;
	labelPosition?: "top" | "left";
	icon?: React.ReactElement;
	placeholder?: string;
	message?: React.ReactNode;
	options: Option[];
	value?: string | number | null;
	hasCheckIcon?: boolean;
	disabled?: boolean;
	id?: string;
};

export type StepperArrayProps = StepperArrayDataProps & {
	onChange?: (value: string | number | null) => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

export const defaults = {
	size: "medium" as const,
	variant: "light" as const,
	color: undefined,
	label: undefined,
	labelPosition: "top" as const,
	message: undefined,
	placeholder: "Select",
	options: [] as Option[],
	hasCheckIcon: true,
};

export default function StepperArray(props: StepperArrayProps) {
	const {
		size,
		variant,
		color,
		label,
		labelPosition,
		message,
		icon,
		placeholder,
		radius,
		options,
		value,
		hasCheckIcon,
		onChange,
		id,
		disabled,
		...rest
	} = { ...defaults, ...props };

	const generatedId = useId();
	const fieldId = id || generatedId;

	const [selectedValue, setSelectedValue] = useState<string | number | null>(value === undefined ? null : value);
	const [isOpen, setIsOpen] = useState(false);
	const [focusedIndex, setFocusedIndex] = useState(-1);

	useEffect(() => {
		setSelectedValue(value === undefined ? null : value);
	}, [value]);

	// Reset focused index when opening
	useEffect(() => {
		if (isOpen) {
			const selectedIdx = options.findIndex((o) => o.value === selectedValue);
			setFocusedIndex(selectedIdx >= 0 ? selectedIdx : 0);
		} else {
			setFocusedIndex(-1);
		}
	}, [isOpen, options, selectedValue]);

	const handleSelect = (option: Option) => {
		setSelectedValue(option.value);
		onChange?.(option.value);
	};

	const { handleKeyDown, setOptionRef } = useSelectKeyboard({
		options,
		isOpen,
		setOpen: setIsOpen,
		focusedIndex,
		setFocusedIndex,
		onSelect: handleSelect,
	});

	// Stepper navigation
	const currentIndex = options.findIndex((o) => o.value === selectedValue);
	const noPrevious = currentIndex <= 0;
	const noNext = currentIndex >= options.length - 1 || currentIndex === -1;

	const handlePrevious = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (noPrevious || options.length === 0) return;
		const prevOption = options[currentIndex - 1];
		if (prevOption) {
			setSelectedValue(prevOption.value);
			onChange?.(prevOption.value);
		}
	};

	const handleNext = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (options.length === 0) return;
		// If nothing selected, select first
		if (currentIndex === -1) {
			const first = options[0];
			if (first) {
				setSelectedValue(first.value);
				onChange?.(first.value);
			}
			return;
		}
		if (noNext) return;
		const nextOption = options[currentIndex + 1];
		if (nextOption) {
			setSelectedValue(nextOption.value);
			onChange?.(nextOption.value);
		}
	};

	const displayLabel =
		options.find((o) => o.value === selectedValue)?.label ||
		options.find((o) => o.value === selectedValue)?.value ||
		placeholder;

	const isPlaceholder = selectedValue === null;

	const buttonSize = {
		small: "mini",
		medium: "small",
		large: "medium",
	}[size] as ButtonSize;
	const buttonOffset = {
		small: "-mr-1",
		medium: "-mr-1.5",
		large: "-mr-2",
	}[size];
	const buttonVariant = {
		light: "light",
		solid: "light",
		soft: "soft",
		unstyled: "ghost",
	}[variant] as "filled" | "outlined" | "ghost" | "link" | "light";

	return (
		<InputGroup {...rest} size={size} labelPosition={labelPosition} hasLabel={!!label}>
			{label && (
				<InputLabel size={size} color={color} htmlFor={fieldId}>
					{label}
				</InputLabel>
			)}
			<Popover size={size} open={isOpen} onOpenChange={setIsOpen}>
				<PopoverTrigger>
					<SelectBox id={fieldId} size={size} variant={variant} color={color} radius={radius} onKeyDown={handleKeyDown}>
						{icon}
						<span className={isPlaceholder ? "opacity-60" : ""}>{displayLabel}</span>
						<DirectionalButton
							size={buttonSize}
							direction="vertical"
							variant={buttonVariant}
							noPrevious={noPrevious}
							noNext={noNext && currentIndex !== -1}
							onPrevious={handlePrevious}
							onNext={handleNext}
							className={`ml-auto ${buttonOffset}`}
						/>
					</SelectBox>
				</PopoverTrigger>
				<PopoverContent matchTriggerWidth className="flex flex-col overflow-y-auto max-h-60">
					{options.map((option, index) => (
						<SelectOption
							key={option.value}
							ref={(el) => setOptionRef(index, el)}
							size={size}
							isSelected={selectedValue === option.value}
							isFocused={focusedIndex === index}
							hasCheckIcon={hasCheckIcon}
							onClick={() => {
								handleSelect(option);
								setIsOpen(false);
							}}
						>
							{option.label || option.value}
						</SelectOption>
					))}
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

StepperArray.defaults = defaults;
