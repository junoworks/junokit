import {
	addDays,
	endOfMonth,
	endOfWeek,
	format,
	isSameDay,
	isSameMonth,
	isToday,
	startOfMonth,
	startOfWeek,
} from "date-fns";
import type { CalendarColor, CalendarRadius, WeekStart } from "../types";
import { getRadiusClass, getWeekStartOptions, isCircularRadius } from "../utils";

type DaysGridProps = {
	currentMonth: Date;
	selectedDate: Date | null;
	onSelectDate: (date: Date | null) => void;
	color: CalendarColor;
	radius?: CalendarRadius | undefined;
	weekStart: WeekStart;
	dayCellHeight: string;
	focusedDate?: Date | null;
	onFocusDate?: (date: Date) => void;
};

export function DaysGrid({
	currentMonth,
	selectedDate,
	onSelectDate,
	color,
	radius,
	weekStart = "Monday",
	dayCellHeight,
	focusedDate,
	onFocusDate,
}: DaysGridProps) {
	const weekStartOptions = getWeekStartOptions(weekStart);
	const isCircular = isCircularRadius(radius);
	const radiusClass = getRadiusClass(radius);
	const cornerStyles = isCircular ? `${radiusClass} aspect-square` : `${radiusClass} w-full flex-grow`;

	const monthStart = startOfMonth(currentMonth);
	const monthEnd = endOfMonth(monthStart);
	const startDate = startOfWeek(monthStart, weekStartOptions);
	const endDate = endOfWeek(monthEnd, weekStartOptions);
	const nextMonthStart = addDays(monthEnd, 1);

	// Color styles using concatenation for Tailwind safelist compatibility
	const selectedBg = "bg-" + color;
	const selectedHoverBg = "hover:bg-" + color + "-focus";
	const selectedOutline = "outline-" + color + "/50";
	const selectedStyle = `${selectedBg} ${selectedHoverBg} !text-white font-medium outline-[2px] ${selectedOutline} outline-offset-1 z-10`;
	const currentDayStyle =
		"bg-current/10 hover:bg-current/20 outline-[0.5px] outline-current/20 -outline-offset-[0.5px]";
	const focusedStyle = "ring-2 ring-current/50 ring-offset-1";

	const weeks: React.ReactNode[] = [];
	let days: React.ReactNode[] = [];
	let day = startDate;

	while (day <= endDate || weeks.length < 6) {
		let isCurrentWeek = false;

		for (let i = 0; i < 7; i++) {
			const formattedDate = format(day, "d");
			const isInCurrentMonth = isSameMonth(day, monthStart);
			const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
			const isCurrentDay = isToday(day);
			const isFocused = focusedDate ? isSameDay(day, focusedDate) : false;

			if (isCurrentDay) {
				isCurrentWeek = true;
			}

			const dayClasses = `${dayCellHeight} ${cornerStyles} flex items-center justify-center 
				${!isInCurrentMonth ? "text-current/40 font-light" : "text-current"}`;

			const currentDay = day;

			days.push(
				<div
					key={currentDay.toISOString()}
					data-date={currentDay.toISOString()}
					role="gridcell"
					aria-selected={isSelected}
					aria-current={isCurrentDay ? "date" : undefined}
					tabIndex={isFocused ? 0 : -1}
					className={`${dayClasses} cursor-pointer
						${isSelected ? selectedStyle : isCurrentDay ? currentDayStyle : "outline-none hover:bg-current/6 active:bg-current/10"}
						${isFocused && !isSelected ? focusedStyle : ""}
					`}
					onClick={(e) => {
						e.stopPropagation();
						onSelectDate(currentDay);
					}}
					onFocus={() => onFocusDate?.(currentDay)}
				>
					{formattedDate}
				</div>,
			);
			day = addDays(day, 1);
		}

		weeks.push(
			<div
				role="row"
				className={`flex w-full gap-0 ${radiusClass} justify-evenly ${isCurrentWeek ? "bg-current/4" : "bg-transparent"}`}
				key={day.getTime()}
			>
				{days}
			</div>,
		);
		days = [];
	}

	// Add extra week if needed for consistent height
	if (weeks.length < 6) {
		const extraDays: React.ReactNode[] = [];
		let nextDay = nextMonthStart;

		for (let i = 0; i < 7; i++) {
			const formattedDate = format(nextDay, "d");
			const isSelected = selectedDate ? isSameDay(nextDay, selectedDate) : false;
			const isCurrentDay = isToday(nextDay);
			const isFocused = focusedDate ? isSameDay(nextDay, focusedDate) : false;

			const dayClasses = `${dayCellHeight} w-full min-w-8 flex-grow ${cornerStyles} flex items-center justify-center
				${
					isSelected
						? selectedStyle
						: isCurrentDay
							? currentDayStyle
							: `outline-none hover:bg-gradient-to-b hover:from-current/6 hover:to-transparent active:bg-gradient-to-b active:from-transparent active:to-current/10`
				}
				${isFocused && !isSelected ? focusedStyle : ""}
			`;

			const currentNextDay = nextDay;
			extraDays.push(
				<div
					key={currentNextDay.toISOString()}
					data-date={currentNextDay.toISOString()}
					role="gridcell"
					aria-selected={isSelected}
					tabIndex={isFocused ? 0 : -1}
					className={dayClasses}
					onClick={(e) => {
						e.stopPropagation();
						onSelectDate(currentNextDay);
					}}
					onFocus={() => onFocusDate?.(currentNextDay)}
				>
					{formattedDate}
				</div>,
			);
			nextDay = addDays(nextDay, 1);
		}

		weeks.push(
			<div role="row" className="flex w-full gap-0" key={nextDay.getTime()}>
				{extraDays}
			</div>,
		);
	}

	return (
		<div role="grid" aria-label="Calendar days" className="w-full flex flex-col">
			{weeks}
		</div>
	);
}
