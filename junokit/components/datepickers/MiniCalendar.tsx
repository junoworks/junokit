import {
	type ChangeEvent,
	forwardRef,
	type KeyboardEvent,
	useEffect,
	useId,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { Button } from "../../";
import { DaysGrid, MonthNavigation, WeekdaysRow } from "./parts";
import type { CalendarColor, CalendarRadius, CalendarSize, WeekStart } from "./types";
import { formatDateForInput, parseDateFromInput } from "./utils";
import { addDays, isSameMonth, startOfMonth } from "./utils/dateHelpers";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "size">;

type MiniCalendarSpecificProps = {
	standalone?: boolean;
	color?: CalendarColor;
	size?: CalendarSize;
	radius?: CalendarRadius;
	weekStart?: WeekStart;
	value?: Date | null;
	onChange?: (date: Date | null) => void;
	inputProps?: InputProps | undefined;
	className?: string;
	style?: React.CSSProperties;
};

export type MiniCalendarProps = MiniCalendarSpecificProps &
	Omit<React.HTMLAttributes<HTMLDivElement>, keyof MiniCalendarSpecificProps>;

export const defaults = {
	standalone: false,
	color: "primary" as CalendarColor,
	radius: undefined as CalendarRadius | undefined,
	weekStart: "Monday" as WeekStart,
	size: "medium" as CalendarSize,
	className: "",
	style: {},
};

const MiniCalendar = forwardRef<HTMLInputElement, MiniCalendarProps>((props, ref) => {
	const {
		standalone,
		color,
		radius,
		weekStart,
		size,
		className,
		style,
		value,
		onChange,
		inputProps,
		id,
		...containerProps
	} = { ...defaults, ...props };

	// Standalone styles
	const outlineStyles = "outline-[0.5px] -outline-offset-[0.5px] outline-current/20 hover:outline-current/30";
	const standaloneStyles = standalone ? `bg-base-0 text-base-content ${outlineStyles} rounded-lg` : "p-0";

	// Size styles
	const sizeStyles: Record<CalendarSize, string> = {
		medium: "w-[240px] text-sm",
		small: "w-[200px] text-xs",
	};

	const paddingStyles: Record<CalendarSize, { innerBottom: string; daysContainer: string }> = {
		medium: { innerBottom: "p-3 pt-0", daysContainer: "p-3 pb-2" },
		small: { innerBottom: "p-2 pt-0", daysContainer: "p-2 pb-1.5" },
	};

	const gapStyles: Record<CalendarSize, { days: string; bottom: string }> = {
		medium: { days: "gap-1", bottom: "gap-2" },
		small: { days: "gap-0.5", bottom: "gap-1.5" },
	};

	const dayCellHeights: Record<CalendarSize, string> = {
		medium: "h-8",
		small: "h-7",
	};

	const classes = `flex flex-col items-stretch relative select-none focus:outline-none ${standaloneStyles} ${sizeStyles[size]} group/calendar ${className}`;

	// State
	const [currentMonth, setCurrentMonth] = useState(startOfMonth(value || new Date()));
	const [currentDate, setCurrentDate] = useState<Date | null>(value === undefined ? null : value);
	const [focusedDate, setFocusedDate] = useState<Date | null>(null);

	const generatedId = useId();
	const inputElementId = id || generatedId;
	const localHiddenInputRef = useRef<HTMLInputElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);

	// Expose the hidden input ref to parent via forwarded ref
	useImperativeHandle(ref, () => localHiddenInputRef.current as HTMLInputElement);

	// Sync with controlled value
	useEffect(() => {
		setCurrentDate(value === undefined ? null : value);
	}, [value]);

	// Update displayed month when value changes
	useEffect(() => {
		if (value) {
			setCurrentMonth(startOfMonth(value));
		}
		if (localHiddenInputRef.current) {
			localHiddenInputRef.current.value = formatDateForInput(value ?? null);
		}
	}, [value]);

	// Focus the correct day cell when focusedDate changes (handles month transitions)
	useEffect(() => {
		if (focusedDate && gridRef.current) {
			const dateKey = focusedDate.toISOString();
			const dayCell = gridRef.current.querySelector(`[data-date="${dateKey}"]`) as HTMLElement;
			if (dayCell) {
				dayCell.focus();
			}
		}
	}, [focusedDate, currentMonth]);

	// Date selection handler
	const handleDateChange = (newDate: Date | null) => {
		setCurrentDate(newDate);
		if (newDate) {
			setCurrentMonth(startOfMonth(newDate));
		}
		onChange?.(newDate);
	};

	// Hidden input change handler (for native picker)
	const handleHiddenInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newDate = parseDateFromInput(event.target.value);
		handleDateChange(newDate);
	};

	// Keyboard navigation
	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		const target = focusedDate || currentDate || new Date();
		let newFocusedDate: Date | null = null;

		switch (e.key) {
			case "ArrowLeft":
				e.preventDefault();
				newFocusedDate = addDays(target, -1);
				break;
			case "ArrowRight":
				e.preventDefault();
				newFocusedDate = addDays(target, 1);
				break;
			case "ArrowUp":
				e.preventDefault();
				newFocusedDate = addDays(target, -7);
				break;
			case "ArrowDown":
				e.preventDefault();
				newFocusedDate = addDays(target, 7);
				break;
			case "Enter":
			case " ":
				e.preventDefault();
				if (focusedDate) {
					handleDateChange(focusedDate);
				} else if (localHiddenInputRef.current) {
					localHiddenInputRef.current.value = formatDateForInput(value ?? null);
					setTimeout(() => localHiddenInputRef.current?.showPicker(), 0);
				}
				return;
			case "Escape":
				setFocusedDate(null);
				return;
			default:
				return;
		}

		// Update focused date and ensure it's visible
		if (newFocusedDate) {
			setFocusedDate(newFocusedDate);
			if (!isSameMonth(newFocusedDate, currentMonth)) {
				setCurrentMonth(startOfMonth(newFocusedDate));
			}
		}
	};

	// Clear focus when clicking outside the calendar
	const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		// Only clear if focus is leaving the calendar entirely
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			setFocusedDate(null);
		}
	};

	return (
		<div
			{...containerProps}
			className={classes}
			id={id}
			style={style}
			tabIndex={0}
			role="application"
			aria-label="Calendar"
			onKeyDown={handleKeyDown}
			onBlur={handleBlur}
		>
			<MonthNavigation
				currentMonth={currentMonth}
				onMonthChange={setCurrentMonth}
				size={size}
				standalone={standalone}
			/>

			<WeekdaysRow weekStart={weekStart} size={size} standalone={standalone} />

			{/* Days Grid */}
			<div
				ref={gridRef}
				className={`flex flex-col w-full items-center justify-between ${gapStyles[size].days} 
					${!standalone ? (size === "small" ? "pt-1.5" : "pt-2") : paddingStyles[size].daysContainer}`}
			>
				<DaysGrid
					currentMonth={currentMonth}
					selectedDate={currentDate}
					color={color}
					weekStart={weekStart}
					onSelectDate={handleDateChange}
					radius={radius}
					dayCellHeight={dayCellHeights[size]}
					focusedDate={focusedDate}
					onFocusDate={setFocusedDate}
				/>
			</div>

			{/* Footer */}
			<div
				className={`w-full ${!standalone ? "p-0 pt-1" : paddingStyles[size].innerBottom} flex justify-between items-center ${gapStyles[size].bottom}`}
			>
				<Button size="mini" variant="ghost" onClick={() => handleDateChange(null)}>
					Clear
				</Button>
				<Button size="mini" variant="light" onClick={() => handleDateChange(new Date())}>
					Today
				</Button>
			</div>

			{/* Hidden native date input for keyboard/native picker support */}
			<input
				{...inputProps}
				ref={localHiddenInputRef}
				id={inputProps?.id || inputElementId}
				type="date"
				onChange={handleHiddenInputChange}
				className="opacity-0 absolute left-[-9999px] top-[-9999px]"
				tabIndex={-1}
				aria-hidden="true"
			/>
		</div>
	);
});

const MiniCalendarWithDefinitions = MiniCalendar as typeof MiniCalendar & {
	defaults: Record<string, unknown>;
};

MiniCalendarWithDefinitions.defaults = defaults;

export default MiniCalendarWithDefinitions;
