import { useEffect, useId, useState } from "react";
import { Checkbox, Divider, SelectBox, SelectOption } from "../..";
import { InputGroup, InputLabel, InputMessage } from "../../base/input";
import type { InputColor, InputRadius, InputSize, InputVariant } from "../../base/input/types";
import { Popover, PopoverContent, PopoverTrigger } from "../../base/popover";
import { ChevronDown } from "../../icons";
import { useSelectKeyboard } from "./utils/useSelectKeyboard";

export type Option = {
	value: string | number;
	label?: string;
};

export type MultiSelectDataProps = {
	variant?: Exclude<InputVariant, "flat">;
	color?: InputColor;
	size?: InputSize;
	radius?: InputRadius;
	label?: React.ReactNode;
	labelPosition?: "top" | "left";
	icon?: React.ReactNode;
	placeholder?: string;
	message?: React.ReactNode;
	options: Option[];
	value?: (string | number)[] | null;
	showSelectAll?: boolean;
	id?: string;
};

export type MultiSelectProps = MultiSelectDataProps & {
	onChange?: (value: (string | number)[]) => void;
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
	showSelectAll: true,
};

export default function MultiSelect(props: MultiSelectProps) {
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
		showSelectAll,
		onChange,
		id,
		...rest
	} = { ...defaults, ...props };

	const generatedId = useId();
	const fieldId = id || generatedId;

	const normalizeValue = (v: typeof value): (string | number)[] => {
		if (v === undefined || v === null) return [];
		if (Array.isArray(v)) return v;
		return [v]; // Handle case where single value is passed instead of array
	};

	const [selectedValues, setSelectedValues] = useState<(string | number)[]>(normalizeValue(value));
	const [isOpen, setIsOpen] = useState(false);
	const [focusedIndex, setFocusedIndex] = useState(-1);

	useEffect(() => {
		setSelectedValues(normalizeValue(value));
	}, [value]);

	// Reset focused index when opening
	useEffect(() => {
		if (isOpen) {
			setFocusedIndex(showSelectAll ? -1 : 0); // Start at "Select All" or first option
		} else {
			setFocusedIndex(-1);
		}
	}, [isOpen, showSelectAll]);

	const handleToggle = (option: Option) => {
		const newValues = selectedValues.includes(option.value)
			? selectedValues.filter((v) => v !== option.value)
			: [...selectedValues, option.value];
		setSelectedValues(newValues);
		onChange?.(newValues);
	};

	const handleSelectAll = () => {
		const allSelected = selectedValues.length === options.length;
		const newValues = allSelected ? [] : options.map((o) => o.value);
		setSelectedValues(newValues);
		onChange?.(newValues);
	};

	// For keyboard: include "Select All" as index -1 if shown
	const allItems = showSelectAll ? [{ value: "__select_all__", label: "Select All" }, ...options] : options;

	const handleKeyboardSelect = (item: Option | { value: "__select_all__"; label: string }) => {
		if (item.value === "__select_all__") {
			handleSelectAll();
		} else {
			handleToggle(item as Option);
		}
	};

	const { handleKeyDown, setOptionRef } = useSelectKeyboard({
		options: allItems,
		isOpen,
		setOpen: setIsOpen,
		focusedIndex,
		setFocusedIndex,
		onSelect: handleKeyboardSelect,
	});

	const displayLabel = selectedValues.length > 0 ? `${selectedValues.length} selected` : placeholder;

	const isPlaceholder = selectedValues.length === 0;

	const allSelected = selectedValues.length === options.length && options.length > 0;
	const someSelected = selectedValues.length > 0 && !allSelected;

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
						<ChevronDown className="ml-auto" />
					</SelectBox>
				</PopoverTrigger>
				<PopoverContent className="flex flex-col overflow-y-auto max-h-60" matchTriggerWidth>
					{showSelectAll && options.length > 0 && (
						<>
							<SelectOption
								ref={(el) => setOptionRef(0, el)}
								size={size}
								isSelected={allSelected}
								isFocused={focusedIndex === 0}
								onClick={handleSelectAll}
								className="flex items-center gap-2"
							>
								<Checkbox
									size={size}
									checked={allSelected}
									indeterminate={someSelected}
									readOnly
									className="pointer-events-none"
								/>
								<span>Select All</span>
							</SelectOption>
							<Divider />
						</>
					)}
					{options.map((option, index) => {
						const itemIndex = showSelectAll ? index + 1 : index;
						return (
							<SelectOption
								key={option.value}
								ref={(el) => setOptionRef(itemIndex, el)}
								size={size}
								isSelected={selectedValues.includes(option.value)}
								isFocused={focusedIndex === itemIndex}
								onClick={() => handleToggle(option)}
							>
								<Checkbox
									size={size}
									checked={selectedValues.includes(option.value)}
									readOnly
									className="pointer-events-none"
								/>
								<span>{option.label || option.value}</span>
							</SelectOption>
						);
					})}
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

MultiSelect.defaults = defaults;
