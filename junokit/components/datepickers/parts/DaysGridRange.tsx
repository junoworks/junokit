import { addDays, format, isAfter, isBefore, isEqual, isSameDay, isSameMonth, isToday, startOfMonth, startOfWeek } from "../utils/dateHelpers";
import type { CalendarColor, CalendarRadius, CalendarSize, WeekStart } from "../types";
import { getRadiusClass, getRadiusLeftClass, getRadiusRightClass, getWeekStartOptions, isCircularRadius } from "../utils";

type DaysGridRangeProps = {
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  hoveredDate: Date | null;
  onDateClick: (date: Date) => void;
  onHoverDate: (date: Date | null) => void;
  size?: CalendarSize;
  color: CalendarColor;
  radius?: CalendarRadius | undefined;
  weekStart: WeekStart;
  // For showing overlapping days in muted color in dual-calendar view
  adjacentMonth?: Date | undefined;
  // Always show 6 weeks for consistent height
  fixedWeeks?: boolean;
};

export function DaysGridRange({
  currentMonth,
  startDate,
  endDate,
  hoveredDate,
  onDateClick,
  onHoverDate,
  size = "medium",
  color,
  radius,
  weekStart = "Monday",
  adjacentMonth,
  fixedWeeks = true,
}: DaysGridRangeProps) {
  const weekStartOptions = getWeekStartOptions(weekStart);
  const isCircular = isCircularRadius(radius);
  const radiusClass = getRadiusClass(radius);

  const monthStart = startOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, weekStartOptions);

  // Size styles
  const cellHeight = size === "small" ? "h-6" : "h-8";

  // Color styles using concatenation for Tailwind safelist
  const selectedBg = "bg-" + color;
  const selectedHoverBg = "hover:bg-" + color + "-focus";
  const selectedOutline = "outline-" + color + "/50";
  const rangeBg = "bg-" + color + "/20";
  const hoverRangeBg = "bg-" + color + "/10";

  const weeks: React.ReactNode[] = [];
  let days: React.ReactNode[] = [];
  let day = calendarStart;

  while (weeks.length < 6) {
    // Check if this week has any days from the current month
    const weekStart = day;
    let weekHasCurrentMonthDay = false;
    for (let check = 0; check < 7; check++) {
      if (isSameMonth(addDays(weekStart, check), monthStart)) {
        weekHasCurrentMonthDay = true;
        break;
      }
    }

    // If no current month days and we already have weeks
    if (!weekHasCurrentMonthDay && weeks.length > 0) {
      if (fixedWeeks) {
        // Render empty row for consistent height
        weeks.push(
          <div role="row" className={`flex w-full gap-0 ${radiusClass} justify-evenly`} key={weeks.length}>
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className={`${cellHeight} flex items-center justify-center aspect-square ${!isCircular ? "w-full flex-grow" : ""}`} />
            ))}
          </div>,
        );
        continue;
      }
      // Compact mode - stop rendering
      break;
    }

    let isCurrentWeek = false;

    for (let i = 0; i < 7; i++) {
      const formattedDate = format(day, "d");
      const isInCurrentMonth = isSameMonth(day, monthStart);
      const isCurrentDay = isToday(day);
      const currentDayRef = day;

      // Check if this day overlaps with adjacent calendar (should be shown in muted color)
      const isOverlapping = adjacentMonth && !isInCurrentMonth && isSameMonth(day, adjacentMonth);

      // Selection state calculations
      const isStart = startDate && isSameDay(day, startDate);
      const isEnd = endDate && isSameDay(day, endDate);
      const isSingleDay = isStart && isEnd;

      // In selected range
      const inSelectedRange = startDate && endDate && !isBefore(endDate, startDate) && (isAfter(day, startDate) || isEqual(day, startDate)) && (isBefore(day, endDate) || isEqual(day, endDate));

      // In hover range (when selecting end date)
      const inHoverRange =
        startDate && !endDate && hoveredDate && !isBefore(hoveredDate, startDate) && (isAfter(day, startDate) || isEqual(day, startDate)) && (isBefore(day, hoveredDate) || isEqual(day, hoveredDate));

      if (isCurrentDay) {
        isCurrentWeek = true;
      }

      // Build class list - use relative for pseudo-element positioning on start/end dates
      let cellClasses = `${cellHeight} flex items-center justify-center aspect-square outline-none relative`;
      let roundingClasses = "";

      // Text/cursor styling - overlapping dates get extra muted styling
      if (isOverlapping) {
        cellClasses += " text-current/20 cursor-default";
      } else if (!isInCurrentMonth) {
        cellClasses += " text-current/30 cursor-default";
      } else {
        cellClasses += " text-current cursor-pointer";
      }

      // Range background for start/end dates (shown via ::before pseudo-element)
      const rangeBeforeBg = "before:bg-" + color + "/20";
      const beforeBase = "before:absolute before:inset-0 before:-z-10";

      // Selection styling
      if (isSingleDay && !isOverlapping) {
        // Single day - no range background needed
        cellClasses += ` ${selectedBg} ${selectedHoverBg} !text-base-0 font-medium outline-[2px] ${selectedOutline} outline-offset-1 z-10`;
        roundingClasses = radiusClass;
      } else if ((isStart || isEnd) && !isOverlapping) {
        // Start/end of range - show solid bg + range bg underneath via ::before
        cellClasses += ` ${selectedBg} ${selectedHoverBg} !text-base-0 font-medium outline-[2px] ${selectedOutline} outline-offset-1 z-10`;
        cellClasses += ` ${beforeBase} before:content-[''] ${rangeBeforeBg}`;
        // Range background rounding - square on the side connecting to range
        if (isStart && !isEnd) {
          cellClasses += ` ${getBeforeRadiusLeft(radius)}`;
        } else if (isEnd && !isStart) {
          cellClasses += ` ${getBeforeRadiusRight(radius)}`;
        }
        roundingClasses = radiusClass;
      } else if (inSelectedRange) {
        // In range (including overlapping dates)
        cellClasses += ` ${rangeBg}`;
        if (!isOverlapping) {
          cellClasses += " font-medium";
        }
        roundingClasses = getRangeRounding(i, radius);
      } else if (inHoverRange && !isEnd && !isOverlapping) {
        cellClasses += ` ${hoverRangeBg}`;
        roundingClasses = getRangeRounding(i, radius);
      } else {
        // Default state
        if (!isOverlapping) {
          if (isCurrentDay && isInCurrentMonth) {
            cellClasses += " bg-current/5";
          } else if (isInCurrentMonth) {
            cellClasses += " hover:bg-current/6 active:bg-current/10";
          }
        }
        roundingClasses = radiusClass;
      }

      // Add width for non-circular radius
      if (!isCircular) {
        cellClasses += " w-full flex-grow";
      }

      days.push(
        <div
          key={currentDayRef.toISOString()}
          role="gridcell"
          aria-selected={!!(isStart || isEnd || inSelectedRange)}
          className={`${cellClasses} ${roundingClasses}`}
          onClick={(e) => {
            e.stopPropagation();
            if (isInCurrentMonth) {
              onDateClick(currentDayRef);
            }
          }}
          onMouseEnter={() => {
            if (startDate && !endDate && isInCurrentMonth) {
              onHoverDate(currentDayRef);
            }
          }}
        >
          {formattedDate}
        </div>,
      );
      day = addDays(day, 1);
    }

    weeks.push(
      <div
        role="row"
        className={`flex w-full gap-0 ${radiusClass} justify-evenly ${isCurrentWeek && !startDate ? "bg-current/4" : "bg-transparent"}`}
        key={weeks.length}
        onMouseLeave={() => {
          if (startDate && !endDate) {
            onHoverDate(null);
          }
        }}
      >
        {days}
      </div>,
    );
    days = [];
  }

  return (
    <div role="grid" aria-label="Calendar days" className="w-full flex flex-col gap-1" onMouseLeave={() => onHoverDate(null)}>
      {weeks}
    </div>
  );
}

/** Get rounding classes for range cells based on position in week */
function getRangeRounding(dayIndex: number, radius?: CalendarRadius): string {
  if (dayIndex === 0) {
    return getRadiusLeftClass(radius);
  }
  if (dayIndex === 6) {
    return getRadiusRightClass(radius);
  }
  return "rounded-none";
}

/** Get ::before rounding for start date (left side rounded, right side square to connect to range) */
function getBeforeRadiusLeft(radius?: CalendarRadius): string {
  const radiusMap: Record<string, string> = {
    none: "before:rounded-none",
    sm: "before:rounded-l-sm",
    md: "before:rounded-l-md",
    lg: "before:rounded-l-lg",
    xl: "before:rounded-l-xl",
    full: "before:rounded-l-full",
  };
  return radiusMap[radius || "md"] || "before:rounded-l-md";
}

/** Get ::before rounding for end date (right side rounded, left side square to connect to range) */
function getBeforeRadiusRight(radius?: CalendarRadius): string {
  const radiusMap: Record<string, string> = {
    none: "before:rounded-none",
    sm: "before:rounded-r-sm",
    md: "before:rounded-r-md",
    lg: "before:rounded-r-lg",
    xl: "before:rounded-r-xl",
    full: "before:rounded-r-full",
  };
  return radiusMap[radius || "md"] || "before:rounded-r-md";
}
