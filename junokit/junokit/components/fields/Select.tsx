import { useEffect, useId, useState } from "react";
import { SelectBox, SelectOption } from "../..";
import { InputGroup, InputLabel, InputMessage } from "../../base/input";
import type { InputColor, InputRadius, InputSize, InputVariant } from "../../base/input/types";
import { Popover, PopoverContent, PopoverTrigger } from "../../base/popover";
import { ChevronDown } from "../../icons";
import { useSelectKeyboard } from "./utils/useSelectKeyboard";

export type Option = {
	value: string | number;
	label?: string;
};

export type SelectDataProps = {
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
	id?: string;
};

export type SelectProps = SelectDataProps & {
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

export default function Select(props: SelectProps) {
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

	const displayLabel =
		options.find((o) => o.value === selectedValue)?.label ||
		options.find((o) => o.value === selectedValue)?.value ||
		placeholder;

	const isPlaceholder = selectedValue === null;

	return (
		<InputGroup size={size} labelPosition={labelPosition} hasLabel={!!label} {...rest}>
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
						<ChevronDown className="ml-auto" />
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

Select.defaults = defaults;
