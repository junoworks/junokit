export function formatNumber(value: number | string): string {
	if (!value && value !== 0) return "";
	const num = typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;
	if (isNaN(num)) return "";
	return new Intl.NumberFormat("en-US").format(num);
}

export function parseNumber(formatted: string): number | null {
	const raw = formatted.replace(/,/g, "");
	if (raw === "" || raw === "-") return null;
	const num = parseFloat(raw);
	return isNaN(num) ? null : num;
}

export function clamp(value: number, min?: number, max?: number): number {
	if (min !== undefined && value < min) return min;
	if (max !== undefined && value > max) return max;
	return value;
}

export function stepValue(current: number, step: number, direction: 1 | -1): number {
	const precision = Math.max(
		(current.toString().split(".")[1] || "").length,
		(step.toString().split(".")[1] || "").length,
	);
	return Number((current + step * direction).toFixed(precision));
}
