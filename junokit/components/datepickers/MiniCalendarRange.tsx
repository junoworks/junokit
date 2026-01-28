import { addMonths, isBefore, isEqual, startOfMonth, subMonths } from "./utils/dateHelpers";
import { forwardRef, useId, useImperativeHandle, useRef, useState } from "react";
import { CalendarPanelRange } from "./parts";
import type { CalendarColor, CalendarRadius, CalendarSize, DateRange, WeekStart } from "./types";
import { useDateRangeSync } from "./utils";

type MiniCalendarRangeSpecificProps = {
  size?: CalendarSize;
  standalone?: boolean;
  color?: CalendarColor;
  radius?: CalendarRadius;
  weekStart?: WeekStart;
  layout?: "double" | "single";
  value?: DateRange | null;
  onChange?: (dateRange: DateRange | null) => void;
  className?: string;
  style?: React.CSSProperties;
};

type MiniCalendarRangeElementProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

export type MiniCalendarRangeProps = MiniCalendarRangeElementProps & MiniCalendarRangeSpecificProps;

export const defaults = {
  size: "medium" as CalendarSize,
  standalone: false,
  color: "primary" as CalendarColor,
  radius: undefined as CalendarRadius | undefined,
  weekStart: "Monday" as WeekStart,
  className: "",
  layout: "double" as "double" | "single",
};

const MiniCalendarRange = forwardRef<HTMLDivElement, MiniCalendarRangeProps>((props, ref) => {
  const { size, standalone, color, radius, weekStart, className, layout, id, value, onChange, style, ...extraProps } = {
    ...defaults,
    ...props,
  };

  // Styles
  const outlineStyles = "outline-[0.5px] -outline-offset-[0.5px] outline-current/20 hover:outline-current/30";
  const standaloneStyles = standalone ? `bg-base-0 text-base-content ${outlineStyles} rounded-lg` : "p-0";

  const gapStyles =
    {
      small: "gap-2",
      medium: "gap-3",
    }[size] || "gap-3";
  const sizeStyles: Record<CalendarSize, string> = {
    small: "text-xs " + (standalone ? "p-2" : "p-0") + " " + gapStyles,
    medium: "text-sm " + (standalone ? "p-3" : "p-0") + " " + gapStyles,
  };

  const flexDirection = layout === "single" ? "flex-col" : "flex-row";
  const classes = [`flex ${flexDirection} relative items-stretch`, "w-fit select-none focus:outline-none", sizeStyles[size], standaloneStyles, "group/calendar", className]
    .filter(Boolean)
    .join(" ")
    .trim();

  // State
  const initialDisplayDate = value?.from || value?.to || new Date();
  const [leftMonth, setLeftMonth] = useState(startOfMonth(initialDisplayDate));
  const rightMonth = addMonths(leftMonth, 1);

  const [startDate, setStartDate] = useState<Date | null>(value?.from || null);
  const [endDate, setEndDate] = useState<Date | null>(value?.to || null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const componentId = useId();
  const mainDivId = id || componentId;
  const mainDivRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => mainDivRef.current as HTMLDivElement);

  // Sync with controlled value
  useDateRangeSync({
    value,
    leftMonth,
    rightMonth,
    setStartDate,
    setEndDate,
    setLeftMonth,
  });

  // Date click handler
  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      onChange?.({ from: date, to: null });
    } else if (startDate && !endDate) {
      if (isBefore(date, startDate) || isEqual(date, startDate)) {
        setStartDate(date);
        setEndDate(null);
        onChange?.({ from: date, to: null });
      } else {
        setEndDate(date);
        onChange?.({ from: startDate, to: date });
      }
    }
  };

  return (
    <div id={mainDivId} {...extraProps} className={classes} ref={mainDivRef} style={style}>
      {layout === "single" ? (
        <CalendarPanelRange
          currentMonth={leftMonth}
          onMonthChange={setLeftMonth}
          startDate={startDate}
          endDate={endDate}
          hoveredDate={hoveredDate}
          onDateClick={handleDateClick}
          onHoverDate={setHoveredDate}
          size={size}
          color={color}
          radius={radius}
          weekStart={weekStart}
          position="single"
          fixedWeeks={false}
        />
      ) : (
        <>
          {/* Left Calendar */}
          <CalendarPanelRange
            currentMonth={leftMonth}
            onMonthChange={setLeftMonth}
            startDate={startDate}
            endDate={endDate}
            hoveredDate={hoveredDate}
            onDateClick={handleDateClick}
            onHoverDate={setHoveredDate}
            size={size}
            color={color}
            radius={radius}
            weekStart={weekStart}
            position="left"
            adjacentMonth={rightMonth}
          />

          {/* Right Calendar */}
          <CalendarPanelRange
            currentMonth={rightMonth}
            onMonthChange={(month) => setLeftMonth(subMonths(month, 1))}
            startDate={startDate}
            endDate={endDate}
            hoveredDate={hoveredDate}
            onDateClick={handleDateClick}
            onHoverDate={setHoveredDate}
            size={size}
            color={color}
            radius={radius}
            weekStart={weekStart}
            position="right"
            adjacentMonth={leftMonth}
          />
        </>
      )}
    </div>
  );
});

const MiniCalendarRangeWithDefinitions = MiniCalendarRange as typeof MiniCalendarRange & {
  defaults: Record<string, unknown>;
};

MiniCalendarRangeWithDefinitions.defaults = defaults;

export default MiniCalendarRangeWithDefinitions;
