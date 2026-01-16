export type CurrencyProps = {
	value: number | string;
	useDecimals?: boolean;
	currency?: string;
	raiseDecimals?: boolean;
	locale?: "en-US" | "de-DE" | "fr-FR";
	showCurrencySymbol?: boolean;
	compactDisplay?: boolean;
	negativeFormat?: "standard" | "parentheses" | "minus-after";
	signDisplay?: "auto" | "always" | "never";
	color?: "success" | "success-content" | "warning" | "warning-content";
} & React.HTMLAttributes<HTMLSpanElement>;

export const defaults = {
	value: "–",
	useDecimals: true,
	currency: "USD",
	raiseDecimals: false,
	locale: "en-US" as const,
	showCurrencySymbol: true,
	compactDisplay: false,
	className: "",
	negativeFormat: "standard" as const,
	signDisplay: "auto" as const,
	style: {} as React.CSSProperties,
};

function Currency(props: CurrencyProps) {
	const {
		value,
		useDecimals,
		currency,
		raiseDecimals,
		locale,
		showCurrencySymbol,
		compactDisplay,
		className,
		negativeFormat,
		signDisplay,
		color,
		style,
		...spanProps
	} = { ...defaults, ...props };

	const valueNumber = typeof value === "string" ? parseFloat(value) : value;

	const textColor = color ? `text-${color}` : "";
	const classes = `${textColor} tabular-nums ${className}`;

	// if the value is not a number, return unformatted value
	if (Number.isNaN(valueNumber)) {
		return (
			<span {...spanProps} className={classes} style={{ ...style } as React.CSSProperties}>
				{value}
			</span>
		);
	}

	// When using compact display, we typically don't want decimals
	// Only show decimals in compact mode for values < 1000
	const effectiveUseDecimals = compactDisplay && Math.abs(valueNumber) >= 1000 ? false : useDecimals;
	const fractionDigits = effectiveUseDecimals ? 2 : 0;

	// Format using Intl.NumberFormat for better locale support
	const formatter = new Intl.NumberFormat(locale, {
		style: showCurrencySymbol ? "currency" : "decimal",
		currency,
		notation: compactDisplay ? "compact" : "standard",
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits,
		signDisplay: signDisplay,
		currencySign: negativeFormat === "parentheses" ? "accounting" : "standard",
	});

	let formattedValue = formatter.format(valueNumber);

	// Handle minus-after format (not supported natively by Intl.NumberFormat)
	if (negativeFormat === "minus-after" && valueNumber < 0) {
		formattedValue = formattedValue.replace(/^-/, "") + "-";
	}

	// Handle parentheses format for browsers that don't support accounting format
	if (negativeFormat === "parentheses" && valueNumber < 0 && !formattedValue.includes("(")) {
		formattedValue = formattedValue.replace(/^-/, "(") + ")";
	}

	if (!raiseDecimals) {
		return (
			<span {...spanProps} className={classes} style={{ ...style } as React.CSSProperties}>
				{formattedValue}
			</span>
		);
	}

	// For raised decimals, directly use the numeric value instead of parsing the formatted string
	if (effectiveUseDecimals) {
		// Format whole part (without decimals)
		const wholeFormatter = new Intl.NumberFormat(locale, {
			style: showCurrencySymbol ? "currency" : "decimal",
			currency,
			notation: compactDisplay ? "compact" : "standard",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
			signDisplay: signDisplay,
			currencySign: negativeFormat === "parentheses" ? "accounting" : "standard",
		});

		let wholePart = wholeFormatter.format(Math.trunc(valueNumber));

		// Format decimal part (just get the digits)
		const decimalValue = Math.abs(valueNumber % 1)
			.toFixed(fractionDigits)
			.substring(2);
		let decimalPart = decimalValue;

		// Apply negative formatting to whole and decimal parts
		if (negativeFormat === "minus-after" && valueNumber < 0) {
			wholePart = wholePart.replace(/^-/, "");
			decimalPart = decimalPart + "-";
		} else if (negativeFormat === "parentheses" && valueNumber < 0) {
			if (!wholePart.includes("(")) {
				wholePart = wholePart.replace(/^-/, "(");
				decimalPart = decimalPart + ")";
			}
		}

		return (
			<span {...spanProps} className={classes} style={{ ...style } as React.CSSProperties}>
				{wholePart}
				<sup className="ml-0.5">{decimalPart}</sup>
			</span>
		);
	}

	// If not using decimals, just return the formatted value
	return (
		<span {...spanProps} className={classes} style={{ ...style } as React.CSSProperties}>
			{formattedValue}
		</span>
	);
}

export default Currency;

Currency.defaults = defaults;
