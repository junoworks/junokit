function convertToPx(value: string): string {
	if (typeof value === "number") {
		return `${value}px`;
	}

	const str = String(value).trim();

	if (str === "0" || str === "none") {
		return "0px";
	}

	if (str.endsWith("px")) {
		return str;
	}

	if (str.endsWith("rem")) {
		const remValue = parseFloat(str);
		if (!Number.isNaN(remValue)) {
			return `${remValue * 16}px`;
		}
	}

	if (str.endsWith("em")) {
		const emValue = parseFloat(str);
		if (!Number.isNaN(emValue)) {
			return `${emValue * 16}px`;
		}
	}

	return str;
}

function getTailwindPaddingClass(prefix: string, value: string | undefined): string | null {
	if (value === undefined || value === null) {
		return null;
	}

	const pxValue = convertToPx(value);

	if (pxValue === "0px" || pxValue === "0") {
		return `${prefix}-0`;
	}

	const mapped = spacingMap[pxValue as keyof typeof spacingMap];
	if (mapped !== undefined) {
		return `${prefix}-${mapped}`;
	}

	return `${prefix}-[${pxValue}]`;
}

type ExtendedPadding = string | number | undefined;


export function makeTailwindPadding(
	p?: ExtendedPadding,
	px?: ExtendedPadding,
	py?: ExtendedPadding,
	pt?: ExtendedPadding,
	pr?: ExtendedPadding,
	pb?: ExtendedPadding,
	pl?: ExtendedPadding,
): string {
	const classes: string[] = [];

	if (p !== undefined && p !== null) {
		const paddingClass = getTailwindPaddingClass("p", typeof p === "number" ? p.toString() : p);
		if (paddingClass) {
			classes.push(paddingClass);
		}
	} else {
		if (px !== undefined && px !== null) {
			const paddingClass = getTailwindPaddingClass("px", typeof px === "number" ? px.toString() : px);
			if (paddingClass) {
				classes.push(paddingClass);
			}
		}
		if (py !== undefined && py !== null) {
			const paddingClass = getTailwindPaddingClass("py", typeof py === "number" ? py.toString() : py);
			if (paddingClass) {
				classes.push(paddingClass);
			}
		}
		if (pt !== undefined && pt !== null) {
			const paddingClass = getTailwindPaddingClass("pt", typeof pt === "number" ? pt.toString() : pt);
			if (paddingClass) {
				classes.push(paddingClass);
			}
		}
		if (pr !== undefined && pr !== null) {
			const paddingClass = getTailwindPaddingClass("pr", typeof pr === "number" ? pr.toString() : pr);
			if (paddingClass) {
				classes.push(paddingClass);
			}
		}
		if (pb !== undefined && pb !== null) {
			const paddingClass = getTailwindPaddingClass("pb", typeof pb === "number" ? pb.toString() : pb);
			if (paddingClass) {
				classes.push(paddingClass);
			}
		}
		if (pl !== undefined && pl !== null) {
			const paddingClass = getTailwindPaddingClass("pl", typeof pl === "number" ? pl.toString() : pl);
			if (paddingClass) {
				classes.push(paddingClass);
			}
		}
	}

	return classes.filter(Boolean).join(" ");
}

export const spacingMap = {
	none: "0",
	"0px": "0",
	"2px": "0.5",
	"4px": "1",
	"6px": "1.5",
	"8px": "2",
	"10px": "2.5",
	"12px": "3",
	"16px": "4",
	"20px": "5",
	"24px": "6",
	"28px": "7",
	"32px": "8",
	"40px": "10",
	"48px": "12",
	"64px": "16",
	"96px": "24",
};




export function makeTailwindMinHeight(minHeight: string | number | undefined): string {
	if (minHeight === undefined || minHeight === null) {
		return "";
	}

	const value = typeof minHeight === "number" ? `${minHeight}px` : minHeight;

	return `min-h-[${value}]`;
}

export function makeTailwindNumericalValue(prefix: string, value: string | number | undefined): string {
	if (value === undefined || value === null) {
		return "";
	}

	const pxValue = typeof value === "number" ? `${value}px` : String(value);

	if (pxValue === "0px" || pxValue === "0") {
		return `${prefix}-0`;
	}

	const mapped = spacingMap[pxValue as keyof typeof spacingMap];
	if (mapped !== undefined) {
		return `${prefix}-${mapped}`;
	}

	return `${prefix}-[${pxValue}]`;
}