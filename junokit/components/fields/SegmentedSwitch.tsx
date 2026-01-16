import { useId } from "react";
import type { SegmentGroupProps, SegmentProps } from "../../base/segment";
import { Segment, SegmentGroup } from "../../base/segment";

export type SegmentOption = {
	value: string;
	label?: React.ReactNode;
	icon?: React.ReactNode;
};

type SegmentSize = SegmentGroupProps["size"];
type SegmentVariant = SegmentGroupProps["variant"];
type SegmentRadius = SegmentGroupProps["radius"];
type SegmentColor = SegmentProps["color"];

export type SegmentedSwitchDataProps = {
	size?: SegmentSize;
	variant?: SegmentVariant;
	color?: SegmentColor;
	radius?: SegmentRadius;
	options: SegmentOption[];
	value?: string;
	equalWidth?: boolean;
	separators?: boolean;
	disabled?: boolean;
};

export type SegmentedSwitchProps = SegmentedSwitchDataProps & {
	onChange?: (value: string) => void;
	name?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

export const defaults = {
	size: undefined as SegmentSize,
	variant: "light" as SegmentVariant,
	color: undefined as SegmentColor,
	radius: undefined as SegmentRadius,
	options: [] as SegmentOption[],
	equalWidth: true,
	separators: undefined as boolean | undefined,
	disabled: undefined as boolean | undefined,
};

export default function SegmentedSwitch(props: SegmentedSwitchProps) {
	const { size, variant, color, radius, options, value, equalWidth, separators, disabled, onChange, name, ...rest } = {
		...defaults,
		...props,
	};

	const generatedId = useId();
	const groupName = name || generatedId;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	return (
		<SegmentGroup
			size={size}
			variant={variant}
			radius={radius}
			equalWidth={equalWidth}
			separators={separators}
			disabled={disabled}
			{...rest}
		>
			{options.map((option) => (
				<Segment
					key={option.value}
					name={groupName}
					value={option.value}
					color={color}
					disabled={disabled}
					checked={value === option.value}
					onChange={handleChange}
				>
					{option.icon}
					{option.label}
				</Segment>
			))}
		</SegmentGroup>
	);
}

SegmentedSwitch.defaults = defaults;
