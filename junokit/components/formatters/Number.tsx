export type NumberProps = {
	value: number | string;
	decimals?: number;
	locale?: "en-US" | "de-DE" | "fr-FR";
	compact?: boolean;
	negativeFormat?: "standard" | "parentheses" | "minus-after";
	signDisplay?: "auto" | "always" | "never";
	signStyle?: "plus-minus" | "arrows";
	color?: "success" | "success-content" | "warning" | "warning-content";
	autoColor?: boolean;
	reverseColors?: boolean;
} & React.HTMLAttributes<HTMLSpanElement>;

export const defaults = {
	value: undefined,
	decimals: 0,
	locale: "en-US" as const,
	compact: false,
	className: "",
	negativeFormat: "standard" as const,
	signDisplay: "auto" as const,
	signStyle: "plus-minus" as const,
	autoColor: false,
	reverseColors: false,
	style: {} as React.CSSProperties,
};

function NumberComponent(props: NumberProps) {
	const {
		value,
		decimals,
		locale,
		compact,
		className,
		negativeFormat,
		signDisplay,
		signStyle,
		color,
		autoColor,
		reverseColors,
		style,
		...spanProps
	} = { ...defaults, ...props };

	// Safety first - ensure decimals is a valid non-negative number
	const safeDecimals =
		typeof decimals === "number" && !Number.isNaN(decimals) && decimals >= 0
			? Math.min(Math.floor(decimals), 20) // Cap at 20 which is the JavaScript limit
			: 0;

	// Safely parse value to number
	let valueNumber: number;
	try {
		valueNumber = typeof value === "string" ? parseFloat(value) : value;
		if (typeof valueNumber !== "number") valueNumber = NaN;
	} catch (_) {
		valueNumber = NaN;
	}

	// Determine the color to use - manual color prop takes priority
	let finalColor = color; // If color is set, it takes priority
	if (!color && autoColor && !Number.isNaN(valueNumber)) {
		if (valueNumber > 0) {
			finalColor = reverseColors ? "warning" : "success";
		} else if (valueNumber < 0) {
			finalColor = reverseColors ? "success" : "warning";
		}
		// Zero remains uncolored when auto-coloring
	}

	const textColor = finalColor ? `text-${finalColor}` : "";
	const classes = `${textColor} !tabular-nums ${className}`;

	// Helper function to convert signs based on signStyle
	const convertSigns = (text: string): string => {
		if (signStyle === "arrows") {
			return text.replace(/\+/g, "↑").replace(/−/g, "↓");
		}
		return text;
	};

	// if the value is not a number, return unformatted value
	if (Number.isNaN(valueNumber)) {
		return (
			<span {...spanProps} className={classes} style={{ ...style } as React.CSSProperties}>
				{value}
			</span>
		);
	}

	// Safely format the number (handling potential errors with Intl.NumberFormat)
	try {
		// For compact display, we need a different approach to ensure decimal places are respected
		if (compact) {
			try {
				// First format without decimals to get the magnitude (K, M, B, etc.)
				const compactFormatter = new Intl.NumberFormat(locale, {
					notation: "compact",
					maximumFractionDigits: 0,
					minimumFractionDigits: 0,
				});
				const compactStr = compactFormatter.format(Math.abs(valueNumber));

				// Extract the suffix (K, M, B, etc.)
				const suffix = compactStr.match(/[KMBTkmbt]$/)?.[0] || "";

				// Calculate the scaled value (e.g., 1.5K from 1500)
				let scaleFactor = 1;
				if (suffix === "K") scaleFactor = 1000;
				else if (suffix === "M") scaleFactor = 1000000;
				else if (suffix === "B") scaleFactor = 1000000000;
				else if (suffix === "T") scaleFactor = 1000000000000;

				const scaledValue = valueNumber / scaleFactor;

				// Format the scaled value with the correct number of decimal places
				const valueFormatter = new Intl.NumberFormat(locale, {
					minimumFractionDigits: safeDecimals,
					maximumFractionDigits: safeDecimals,
					signDisplay: signDisplay,
				});

				let formattedValue = valueFormatter.format(scaledValue) + suffix;

				// Proper minus sign for consistent width with plus
				formattedValue = formattedValue.replace(/-/g, "−"); // U+2212 minus sign

				// Handle negative formats
				if (negativeFormat === "minus-after" && valueNumber < 0) {
					formattedValue = `${formattedValue.replace(/^−/, "")}−`;
				} else if (negativeFormat === "parentheses" && valueNumber < 0) {
					formattedValue = `${formattedValue.replace(/^−/, "(")})`;
					if (!formattedValue.includes("(")) {
						formattedValue = `(${formattedValue}`;
					}
				}

				// Apply sign style conversion
				formattedValue = convertSigns(formattedValue);

				return (
					<span {...spanProps} className={classes} style={{ ...style } as React.CSSProperties}>
						{formattedValue}
					</span>
				);
			} catch (error) {
				// Fallback to standard formatting if compact formatting fails
				console.warn("Error in compact number formatting, falling back to standard", error);
			}
		}

		// Standard (non-compact) formatting
		const formatter = new Intl.NumberFormat(locale, {
			style: "decimal",
			minimumFractionDigits: safeDecimals,
			maximumFractionDigits: safeDecimals,
			signDisplay: signDisplay,
		});

		let formattedValue = formatter.format(valueNumber);

		// Proper minus sign for consistent width with plus
		formattedValue = formattedValue.replace(/-/g, "−"); // U+2212 minus sign

		// Handle minus-after format (not supported natively by Intl.NumberFormat)
		if (negativeFormat === "minus-after" && valueNumber < 0) {
			formattedValue = `${formattedValue.replace(/^−/, "")}−`;
		}

		// Handle parentheses format for browsers that don't support accounting format
		if (negativeFormat === "parentheses" && valueNumber < 0 && !formattedValue.includes("(")) {
			formattedValue = `${formattedValue.replace(/^−/, "(")})`;
		}

		// Apply sign style conversion
		formattedValue = convertSigns(formattedValue);

		return (
			<span {...spanProps} className={classes} style={{ ...style } as React.CSSProperties}>
				{formattedValue}
			</span>
		);
	} catch (_) {
		// Ultimate fallback: if all formatting fails, just return the original value
		return (
			<span {...spanProps} className={classes} style={{ ...style } as React.CSSProperties}>
				{value}
			</span>
		);
	}
}

const NumberWithDefinitions = NumberComponent as typeof NumberComponent & {
	defaults: Record<string, unknown>;
};

export default NumberWithDefinitions;

NumberWithDefinitions.defaults = defaults;
