export type DateTimeProps = {
	value: Date | string | number | null; // Date object, ISO string, timestamp, or null
	format?:
		| "short"
		| "medium"
		| "long"
		| "full"
		| "relative"
		| "dd MMM, yyyy"
		| "MM/dd/yy"
		| "yyyy-MM-dd"
		| "dd/MM/yyyy"
		| "MMM dd, yyyy"
		| "yyyy/MM/dd";
	type?: "date" | "time" | "datetime";
	locale?: string;
	timeZone?: string;
	showTimeZone?: boolean; // Whether to display the timezone
	calendar?: boolean; // Use calendar format (yesterday, tomorrow, etc.)
} & React.HTMLAttributes<HTMLSpanElement>;

export const defaults = {
	format: "medium" as const,
	type: "datetime" as const,
	locale: "en-US",
	showTimeZone: false,
	calendar: false,
	style: {} as React.CSSProperties,
};

// Common format presets
const FORMAT_PRESETS = {
	"dd MMM, yyyy": "dd MMM, yyyy", // 10 Apr, 2025
	"MM/dd/yy": "MM/dd/yy", // 04/10/25
	"yyyy-MM-dd": "yyyy-MM-dd", // 2025-10-20
	"dd/MM/yyyy": "dd/MM/yyyy", // 10/04/2025
	"MMM dd, yyyy": "MMM dd, yyyy", // Apr 10, 2025
	"yyyy/MM/dd": "yyyy/MM/dd", // 2025/04/10
};

function DateTime(props: DateTimeProps) {
	const { value, format, type, locale, timeZone, showTimeZone, calendar, className, style, ...spanProps } = {
		...defaults,
		...props,
	};

	// Parse the value to a Date object
	const dateValue = value !== null ? parseDateTime(value) : null;

	const classes = `${className}`;

	// If date is invalid, return placeholder
	if (!dateValue) {
		return (
			<span {...spanProps} className={classes} style={{ ...style } as React.CSSProperties}>
				{value?.toString()}
			</span>
		);
	}

	// Handle relative format
	if (format === "relative") {
		try {
			const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
			const now = new Date();
			const diffInSeconds = (dateValue.getTime() - now.getTime()) / 1000;
			const diffInDays = Math.round(diffInSeconds / 86400);
			const diffInHours = Math.round(diffInSeconds / 3600);
			const diffInMinutes = Math.round(diffInSeconds / 60);

			let formattedValue: string;
			if (Math.abs(diffInDays) >= 30) {
				const diffInMonths = Math.round(diffInDays / 30);
				formattedValue = rtf.format(diffInMonths, "month");
			} else if (Math.abs(diffInDays) >= 1) {
				formattedValue = rtf.format(diffInDays, "day");
			} else if (Math.abs(diffInHours) >= 1) {
				formattedValue = rtf.format(diffInHours, "hour");
			} else if (Math.abs(diffInMinutes) >= 1) {
				formattedValue = rtf.format(diffInMinutes, "minute");
			} else {
				formattedValue = rtf.format(Math.round(diffInSeconds), "second");
			}

			return (
				<span {...spanProps} className={classes} style={{ ...style } as React.CSSProperties}>
					{formattedValue}
				</span>
			);
		} catch (error) {
			console.warn("Error in relative time formatting", error);
		}
	}

	// Handle calendar format
	if (calendar) {
		try {
			return (
				<span {...spanProps} className={classes} style={{ ...style } as React.CSSProperties}>
					{dateValue.toLocaleDateString(locale, {
						dateStyle: format as any,
						calendar: "gregory",
					})}
				</span>
			);
		} catch (error) {
			console.warn("Error in calendar formatting", error);
		}
	}

	// Check if we're using a predefined format pattern
	if (FORMAT_PRESETS[format as keyof typeof FORMAT_PRESETS]) {
		try {
			const formattedValue = formatCustom(
				dateValue,
				FORMAT_PRESETS[format as keyof typeof FORMAT_PRESETS],
				locale,
				timeZone,
			);
			return (
				<span {...spanProps} className={classes} style={{ ...style } as React.CSSProperties}>
					{formattedValue}
				</span>
			);
		} catch (error) {
			console.warn("Error in preset format", error);
		}
	}

	// For standard formatting using Intl.DateTimeFormat
	try {
		const options: Intl.DateTimeFormatOptions = {};

		// Configure options based on type and format
		if (type === "date" || type === "datetime") {
			if (["short", "medium", "long", "full"].includes(format)) {
				options.dateStyle = format as any;
			}
		}

		if (type === "time" || type === "datetime") {
			if (["short", "medium", "long", "full"].includes(format)) {
				options.timeStyle = format as any;
			}
		}

		if (timeZone) {
			options.timeZone = timeZone;
		}

		if (showTimeZone) {
			options.timeZoneName = "short";
		}

		const formatter = new Intl.DateTimeFormat(locale, options);
		const formattedValue = formatter.format(dateValue);

		return (
			<span {...spanProps} className={classes} style={{ ...style } as React.CSSProperties}>
				{formattedValue}
			</span>
		);
	} catch (error) {
		console.warn("Error in date formatting", error);
		return (
			<span {...spanProps} className={classes} style={{ ...style } as React.CSSProperties}>
				{value?.toString() || ""}
			</span>
		);
	}
}

// Helper function for custom date formatting
function formatCustom(date: Date, format: string, locale: string, timeZone?: string): string {
	// Get the parts from the formatter
	const formatter = new Intl.DateTimeFormat(locale, {
		timeZone,
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: format.includes("a"),
	});

	const parts = formatter.formatToParts(date);

	// For month names, we need a separate formatter
	const monthFormatter = new Intl.DateTimeFormat(locale, { month: "short" });
	const monthName = monthFormatter.formatToParts(date).find((p) => p.type === "month")?.value || "";

	// Get individual date parts
	const year = parts.find((p) => p.type === "year")?.value || "";
	const month = parts.find((p) => p.type === "month")?.value || "";
	const day = parts.find((p) => p.type === "day")?.value || "";
	const hour = parts.find((p) => p.type === "hour")?.value || "";
	const minute = parts.find((p) => p.type === "minute")?.value || "";
	const second = parts.find((p) => p.type === "second")?.value || "";
	const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value || "";

	// Replace various tokens in the format string
	return format
		.replace(/yyyy/g, year)
		.replace(/yy/g, year.slice(-2))
		.replace(/MMM/g, monthName)
		.replace(/MM/g, month.padStart(2, "0"))
		.replace(/dd/g, day.padStart(2, "0"))
		.replace(/HH/g, hour.padStart(2, "0"))
		.replace(/mm/g, minute.padStart(2, "0"))
		.replace(/ss/g, second.padStart(2, "0"))
		.replace(/a/g, dayPeriod);
}

export default DateTime;

DateTime.defaults = defaults;

export function parseDateTime(value: Date | string | number): Date | null {
	if (value instanceof Date) {
		return !Number.isNaN(value.getTime()) ? value : null;
	}

	if (typeof value === "string" || typeof value === "number") {
		const date = new Date(value);
		return !Number.isNaN(date.getTime()) ? date : null;
	}

	// Default to current date if no valid value provided
	return null;
}
