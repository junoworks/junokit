import { useId } from "react";
import type { TabGroupProps } from "../../base/tabs";
import { Tab, TabGroup } from "../../base/tabs";

export type TabOption = {
	value: string;
	label?: React.ReactNode;
	icon?: React.ReactNode;
};

type TabsSize = TabGroupProps["size"];
type TabsVariant = TabGroupProps["variant"];
type TabsColor = TabGroupProps["color"];
type TabsSide = TabGroupProps["side"];

export type TabsDataProps = {
	size?: TabsSize;
	variant?: TabsVariant;
	color?: TabsColor;
	side?: TabsSide;
	options: TabOption[];
	value?: string;
};

export type TabsProps = TabsDataProps & {
	onChange?: (value: string) => void;
	name?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

export const defaults = {
	size: undefined as TabsSize,
	variant: "ghost" as TabsVariant,
	color: undefined as TabsColor,
	side: "bottom" as TabsSide,
	options: [] as TabOption[],
};

export default function Tabs(props: TabsProps) {
	const { size, variant, color, side, options, value, onChange, name, ...rest } = { ...defaults, ...props };

	const generatedId = useId();
	const groupName = name || generatedId;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	return (
		<TabGroup size={size} variant={variant} color={color} side={side} {...rest}>
			{options.map((option, index) => (
				<Tab
					key={option.value}
					name={groupName}
					value={option.value}
					{...(value !== undefined ? { checked: value === option.value } : { defaultChecked: index === 0 })}
					onChange={handleChange}
				>
					{option.icon}
					{option.label}
				</Tab>
			))}
		</TabGroup>
	);
}

Tabs.defaults = defaults;
