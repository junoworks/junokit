export function formatDisplayDate(
	date: Date | string | null,
	format: string = "dd MMM, yyyy",
	locale: string = "en-US",
): string {
	if (!date) return "";
	const dateObj = typeof date === "string" ? new Date(date) : date;
	if (Number.isNaN(dateObj?.getTime())) return "";
	try {
		const formatter = new Intl.DateTimeFormat(locale, {
			year: "numeric",
			month: "numeric",
			day: "numeric",
		});
		const parts = formatter.formatToParts(dateObj);

		const monthFormatter = new Intl.DateTimeFormat(locale, { month: "short" });
		const monthName = monthFormatter.formatToParts(dateObj).find((p) => p.type === "month")?.value || "";

		const year = parts.find((p) => p.type === "year")?.value || "";
		const month = parts.find((p) => p.type === "month")?.value || "";
		const day = parts.find((p) => p.type === "day")?.value || "";

		return format
			.replace(/yyyy/g, year)
			.replace(/yy/g, year.slice(-2))
			.replace(/MMM/g, monthName)
			.replace(/MM/g, month.padStart(2, "0"))
			.replace(/dd/g, day.padStart(2, "0"));
	} catch {
		return "";
	}
}

export function formatDateForInput(date: Date | string | null): string {
	if (!date) return "";
	const dateObj = typeof date === "string" ? new Date(date) : date;
	if (Number.isNaN(dateObj?.getTime())) return "";
	const year = dateObj.getFullYear();
	const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
	const day = dateObj.getDate().toString().padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export function normalizeValue(val: Date | string | null | undefined): Date | null {
	if (val === undefined || val === null) return null;
	if (typeof val === "string") {
		const dateObj = new Date(val);
		return Number.isNaN(dateObj.getTime()) ? null : dateObj;
	}
	return val;
}
