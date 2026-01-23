/**
 * Minimal date utility functions.
 * Only implements the specific functionality used by the datepicker components.
 */

/**
 * Add days to a date
 */
export function addDays(date: Date, amount: number): Date {
	const result = new Date(date);
	result.setDate(result.getDate() + amount);
	return result;
}

/**
 * Add months to a date
 */
export function addMonths(date: Date, amount: number): Date {
	const result = new Date(date);
	const dayOfMonth = result.getDate();
	result.setMonth(result.getMonth() + amount);
	// Handle month overflow (e.g., Jan 31 + 1 month should be Feb 28/29, not Mar 2/3)
	if (result.getDate() !== dayOfMonth) {
		result.setDate(0); // Set to last day of previous month
	}
	return result;
}

/**
 * Subtract months from a date
 */
export function subMonths(date: Date, amount: number): Date {
	return addMonths(date, -amount);
}

/**
 * Get start of month (first day at 00:00:00.000)
 */
export function startOfMonth(date: Date): Date {
	const result = new Date(date);
	result.setDate(1);
	result.setHours(0, 0, 0, 0);
	return result;
}

/**
 * Get end of month (last day at 23:59:59.999)
 */
export function endOfMonth(date: Date): Date {
	const result = new Date(date);
	result.setMonth(result.getMonth() + 1);
	result.setDate(0);
	result.setHours(23, 59, 59, 999);
	return result;
}

type WeekStartOptions = { weekStartsOn?: 0 | 1 };

/**
 * Get start of week
 * weekStartsOn: 0 = Sunday, 1 = Monday
 */
export function startOfWeek(date: Date, options?: WeekStartOptions): Date {
	const result = new Date(date);
	const weekStartsOn = options?.weekStartsOn ?? 0;
	const day = result.getDay();
	const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
	result.setDate(result.getDate() - diff);
	result.setHours(0, 0, 0, 0);
	return result;
}

/**
 * Get end of week
 * weekStartsOn: 0 = Sunday, 1 = Monday
 */
export function endOfWeek(date: Date, options?: WeekStartOptions): Date {
	const result = startOfWeek(date, options);
	result.setDate(result.getDate() + 6);
	result.setHours(23, 59, 59, 999);
	return result;
}

/**
 * Set the month of a date (0-11)
 */
export function setMonth(date: Date, month: number): Date {
	const result = new Date(date);
	const dayOfMonth = result.getDate();
	result.setMonth(month);
	// Handle month overflow
	if (result.getDate() !== dayOfMonth) {
		result.setDate(0);
	}
	return result;
}

/**
 * Set the year of a date
 */
export function setYear(date: Date, year: number): Date {
	const result = new Date(date);
	result.setFullYear(year);
	return result;
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(dateLeft: Date, dateRight: Date): boolean {
	return (
		dateLeft.getFullYear() === dateRight.getFullYear() &&
		dateLeft.getMonth() === dateRight.getMonth() &&
		dateLeft.getDate() === dateRight.getDate()
	);
}

/**
 * Check if two dates are in the same month
 */
export function isSameMonth(dateLeft: Date, dateRight: Date): boolean {
	return dateLeft.getFullYear() === dateRight.getFullYear() && dateLeft.getMonth() === dateRight.getMonth();
}

/**
 * Check if date is today
 */
export function isToday(date: Date): boolean {
	return isSameDay(date, new Date());
}

/**
 * Check if first date is before second date
 */
export function isBefore(date: Date, dateToCompare: Date): boolean {
	return date.getTime() < dateToCompare.getTime();
}

/**
 * Check if first date is after second date
 */
export function isAfter(date: Date, dateToCompare: Date): boolean {
	return date.getTime() > dateToCompare.getTime();
}

/**
 * Check if two dates are equal (same timestamp)
 */
export function isEqual(leftDate: Date, rightDate: Date): boolean {
	return leftDate.getTime() === rightDate.getTime();
}

const MONTH_NAMES_FULL = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

/**
 * Format date according to pattern
 * Only implements patterns actually used:
 * - "d" - day of month (1-31)
 * - "MMMM yyyy" - full month name and year (e.g., "January 2026")
 */
export function format(date: Date, formatStr: string): string {
	switch (formatStr) {
		case "d":
			return String(date.getDate());
		case "MMMM yyyy":
			return `${MONTH_NAMES_FULL[date.getMonth()]} ${date.getFullYear()}`;
		default:
			// Fallback: just return ISO date for unknown formats
			return date.toISOString().split("T")[0] ?? "";
	}
}
