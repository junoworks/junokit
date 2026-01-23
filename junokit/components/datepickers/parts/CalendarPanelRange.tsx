import { Button } from "../../../";
import { ChevronLeft, ChevronRight } from "../../../icons";
import type { CalendarColor, CalendarRadius, CalendarSize, WeekStart } from "../types";
import { addMonths, subMonths } from "../utils/dateHelpers";
import { DaysGridRange } from "./DaysGridRange";
import { MonthYearSelector } from "./MonthYearSelector";
import { WeekdaysRow } from "./WeekdaysRow";

type CalendarPanelRangeProps = {
	currentMonth: Date;
	onMonthChange: (month: Date) => void;
	startDate: Date | null;
	endDate: Date | null;
	hoveredDate: Date | null;
	onDateClick: (date: Date) => void;
	onHoverDate: (date: Date | null) => void;
	size: CalendarSize;
	color: CalendarColor;
	radius?: CalendarRadius | undefined;
	weekStart: WeekStart;
	/** For dual-calendar: which side is this panel on. "single" shows both arrows. */
	position: "left" | "right" | "single";
	/** The adjacent calendar's month (to show overlapping days in muted color). Optional for single mode. */
	adjacentMonth?: Date;
	/** Always show 6 weeks for consistent height */
	fixedWeeks?: boolean;
};

export function CalendarPanelRange({
	currentMonth,
	onMonthChange,
	startDate,
	endDate,
	hoveredDate,
	onDateClick,
	onHoverDate,
	size,
	color,
	radius,
	weekStart,
	position,
	adjacentMonth,
	fixedWeeks = true,
}: CalendarPanelRangeProps) {
	const showLeftArrow = position === "left" || position === "single";
	const showRightArrow = position === "right" || position === "single";

	return (
		<div className="flex flex-col gap-1">
			{/* Month Header */}
			<div className="grid grid-cols-[auto_1fr_auto] items-center w-full">
				{showLeftArrow ? (
					<Button
						icon={<ChevronLeft />}
						variant="ghost"
						size="mini"
						aria-label="Previous month"
						onClick={() => onMonthChange(subMonths(currentMonth, 1))}
					/>
				) : (
					<div className="w-[1.5rem]" />
				)}
				<MonthYearSelector currentMonth={currentMonth} onMonthChange={onMonthChange} size={size} />
				{showRightArrow ? (
					<Button
						icon={<ChevronRight />}
						size="mini"
						variant="ghost"
						aria-label="Next month"
						onClick={() => onMonthChange(addMonths(currentMonth, 1))}
					/>
				) : (
					<div className="w-[1.5rem]" />
				)}
			</div>

			{/* Weekdays Row */}
			<WeekdaysRow weekStart={weekStart} size={size} />

			{/* Days Grid */}
			<div className="flex flex-col w-full items-center justify-between">
				<DaysGridRange
					currentMonth={currentMonth}
					startDate={startDate}
					endDate={endDate}
					hoveredDate={hoveredDate}
					onDateClick={onDateClick}
					onHoverDate={onHoverDate}
					size={size}
					color={color}
					radius={radius}
					weekStart={weekStart}
					adjacentMonth={adjacentMonth}
					fixedWeeks={fixedWeeks}
				/>
			</div>
		</div>
	);
}
