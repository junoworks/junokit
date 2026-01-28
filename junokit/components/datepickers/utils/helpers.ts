import { addDays, addMonths, endOfMonth, endOfWeek, startOfMonth, startOfWeek, subMonths } from "./dateHelpers";
import type { PresetValue } from "../lib/presets";
import type { DateRange } from "../types";

/** Format Date object to yyyy-MM-dd string for input type="date" */
export function formatDateForInput(date: Date | null): string {
  if (!date || Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Parse yyyy-MM-dd string to Date object (local time) */
export function parseDateFromInput(dateString: string): Date | null {
  if (!dateString) return null;
  const date = new Date(`${dateString}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Get the weekday abbreviations based on week start */
export function getWeekdayLabels(weekStart: "Monday" | "Sunday"): string[] {
  return weekStart === "Sunday" ? ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
}

/** Get week start options for helper functions */
export function getWeekStartOptions(weekStart: "Monday" | "Sunday"): { weekStartsOn: 0 | 1 } {
  return weekStart === "Sunday" ? { weekStartsOn: 0 } : { weekStartsOn: 1 };
}

/** Generate calendar days for a given month */
export function getCalendarDays(currentMonth: Date, weekStart: "Monday" | "Sunday"): Date[][] {
  const weekStartOptions = getWeekStartOptions(weekStart);
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, weekStartOptions);
  const endDate = endOfWeek(monthEnd, weekStartOptions);

  const weeks: Date[][] = [];
  let days: Date[] = [];
  let day = startDate;

  while (day <= endDate || weeks.length < 6) {
    for (let i = 0; i < 7; i++) {
      days.push(day);
      day = addDays(day, 1);
    }
    weeks.push(days);
    days = [];
  }

  return weeks;
}

/** Month names for dropdown */
export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** Generate year range for dropdown (current year ± range) */
export function getYearRange(centerYear: number, range = 50): number[] {
  const years: number[] = [];
  for (let i = centerYear - range; i <= centerYear + range; i++) {
    years.push(i);
  }
  return years;
}

/** Navigate a grid with arrow keys. Returns new index or null if navigation not possible. */
export function navigateGrid(currentIndex: number, key: string, columns: number, totalItems: number): number | null {
  let newIndex = currentIndex;

  switch (key) {
    case "ArrowLeft":
      newIndex = currentIndex - 1;
      break;
    case "ArrowRight":
      newIndex = currentIndex + 1;
      break;
    case "ArrowUp":
      newIndex = currentIndex - columns;
      break;
    case "ArrowDown":
      newIndex = currentIndex + columns;
      break;
    default:
      return null;
  }

  // Clamp to valid range
  if (newIndex < 0 || newIndex >= totalItems) {
    return null;
  }

  return newIndex;
}

/** Radius class mapping for calendar cells */
const RADIUS_CLASSES = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
} as const;

/** Default radius when not specified */
const DEFAULT_RADIUS = "md" as const;

/** Get radius class for calendar cells */
export function getRadiusClass(radius?: string): string {
  if (!radius) return RADIUS_CLASSES[DEFAULT_RADIUS];
  return RADIUS_CLASSES[radius as keyof typeof RADIUS_CLASSES] || RADIUS_CLASSES[DEFAULT_RADIUS];
}

/** Get left-side radius class for range cells */
export function getRadiusLeftClass(radius?: string): string {
  if (!radius) return "rounded-l-md";
  const r = radius as keyof typeof RADIUS_CLASSES;
  return r === "full" ? "rounded-l-full" : `rounded-l-${r}`;
}

/** Get right-side radius class for range cells */
export function getRadiusRightClass(radius?: string): string {
  if (!radius) return "rounded-r-md";
  const r = radius as keyof typeof RADIUS_CLASSES;
  return r === "full" ? "rounded-r-full" : `rounded-r-${r}`;
}

/** Check if radius is circular (full) - affects layout */
export function isCircularRadius(radius?: string): boolean {
  return radius === "full";
}

/** Convert a preset value to a date range */
export function getDateRangeFromPreset(presetValue: PresetValue, isToday?: boolean): DateRange {
  const today = new Date();

  if (isToday) {
    return { from: today, to: today };
  }

  if (typeof presetValue === "string") {
    switch (presetValue) {
      case "this-month":
        return { from: startOfMonth(today), to: endOfMonth(today) };
      case "previous-month": {
        const lastMonth = subMonths(today, 1);
        return { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
      }
      case "next-month": {
        const nextMonth = addMonths(today, 1);
        return { from: startOfMonth(nextMonth), to: endOfMonth(nextMonth) };
      }
      default:
        return { from: today, to: today };
    }
  }

  const days = presetValue;
  if (days === -1) {
    const yesterday = addDays(today, -1);
    return { from: yesterday, to: yesterday };
  }
  if (days === 1) {
    const tomorrow = addDays(today, 1);
    return { from: tomorrow, to: tomorrow };
  }
  if (days < -1) {
    return { from: addDays(today, days + 1), to: today };
  }
  if (days > 1) {
    return { from: today, to: addDays(today, days - 1) };
  }
  return { from: today, to: today };
}
