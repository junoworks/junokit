import { Button } from "../../../";
import { ChevronLeft, ChevronRight } from "../../../icons";
import type { CalendarSize } from "../types";
import { addMonths, subMonths } from "../utils/dateHelpers";
import { MonthYearSelector } from "./MonthYearSelector";

type MonthNavigationProps = {
	currentMonth: Date;
	onMonthChange: (month: Date) => void;
	size: CalendarSize;
	standalone: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onMonthChange">;

export function MonthNavigation({ currentMonth, onMonthChange, size, standalone, ...rest }: MonthNavigationProps) {
	const paddingStyles: Record<CalendarSize, string> = {
		medium: "px-3 pt-2 -mb-1",
		small: "px-2 pt-1 -mb-0.5",
	};

	return (
		<div
			{...rest}
			className={`flex flex-row justify-between items-center w-full ${standalone ? paddingStyles[size] : "p-0"} ${rest.className}`}
		>
			<Button
				icon={<ChevronLeft />}
				variant="ghost"
				size="mini"
				aria-label="Previous month"
				onClick={() => onMonthChange(subMonths(currentMonth, 1))}
			/>
			<MonthYearSelector currentMonth={currentMonth} size={size} onMonthChange={onMonthChange} />
			<Button
				icon={<ChevronRight />}
				size="mini"
				variant="ghost"
				aria-label="Next month"
				onClick={() => onMonthChange(addMonths(currentMonth, 1))}
			/>
		</div>
	);
}
