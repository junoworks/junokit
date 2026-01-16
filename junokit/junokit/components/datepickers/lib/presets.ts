/**
 * Date Range Presets
 *
 * These are built-in preset configurations for the date range picker.
 *
 * To add custom presets:
 * 1. Create a new preset object following the PresetOption type
 * 2. Import and pass it to the PresetOptions component
 *
 * Example:
 * ```ts
 * import type { PresetOption } from './presets';
 *
 * const myCustomPresets: PresetOption[] = [
 *   { label: "Last Quarter", value: -90 },
 *   { label: "This Year", value: "this-year" },
 * ];
 * ```
 */

export type PresetValue = number | "this-month" | "previous-month" | "next-month" | "clear";

export type PresetOption = {
	label: string;
	value: PresetValue;
	isToday?: boolean; // Special flag for "Today" which uses different logic
	isClear?: boolean; // Special flag for "Clear" action
};

export const PAST_PRESETS: PresetOption[] = [
	{ label: "Today", value: 0, isToday: true },
	{ label: "Yesterday", value: -1 },
	{ label: "Last 7 Days", value: -7 },
	{ label: "Last 30 Days", value: -30 },
	{ label: "This Month", value: "this-month" },
	{ label: "Previous Month", value: "previous-month" },
	{ label: "Clear", value: "clear", isClear: true },
];

export const FUTURE_PRESETS: PresetOption[] = [
	{ label: "Today", value: 0, isToday: true },
	{ label: "Tomorrow", value: 1 },
	{ label: "Next 7 Days", value: 7 },
	{ label: "Next 30 Days", value: 30 },
	{ label: "This Month", value: "this-month" },
	{ label: "Next Month", value: "next-month" },
	{ label: "Clear", value: "clear", isClear: true },
];

export type PresetType = "past" | "future";

export function getPresets(type: PresetType): PresetOption[] {
	return type === "past" ? PAST_PRESETS : FUTURE_PRESETS;
}
