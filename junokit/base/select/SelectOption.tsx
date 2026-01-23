import { forwardRef } from "react";
import { Check } from "../../icons";
import type { InputSize } from "../input/types";

export type SelectOptionProps = {
	size?: InputSize;
	isSelected?: boolean;
	isFocused?: boolean;
	hasCheckIcon?: boolean;
	children?: React.ReactNode;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className">;

const defaults = {
	size: "medium" as const,
	isSelected: false,
	isFocused: false,
	hasCheckIcon: false,
};

const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>((props, ref) => {
	const { size, isSelected, isFocused, hasCheckIcon, children, className, ...rest } = { ...defaults, ...props };

	const classes = [
		"select-option",
		`select-option-${size}`,
		isSelected && "select-option-selected",
		isFocused && "select-option-focused",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div ref={ref} role="option" aria-selected={isSelected} className={classes} {...rest}>
			{hasCheckIcon &&
				(isSelected ? <Check size="1em" /> : <span style={{ width: "1em", height: "1em", flexShrink: 0 }} />)}
			<span className="flex-1 min-w-0 truncate">{children}</span>
		</div>
	);
});

SelectOption.displayName = "SelectOption";

export default SelectOption;
