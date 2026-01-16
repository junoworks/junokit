import type React from "react";

type Padding = string | number;
type Margin = string | number;

export type LayoutPaddingProps = {
	p?: Padding | undefined;
	px?: Padding | undefined;
	py?: Padding | undefined;
	pt?: Padding | undefined;
	pr?: Padding | undefined;
	pb?: Padding | undefined;
	pl?: Padding | undefined;
};

export const emptyPaddingDefaults: Partial<LayoutPaddingProps> = {};
function normalizePaddingValue(value: Padding): string {
	if (typeof value === "number") {
		return `${value}px`;
	}
	return String(value);
}

export function processLayoutPadding(padding: Partial<LayoutPaddingProps> | undefined): {
	vars: Record<string, string>;
	styles: Record<string, string>;
} {
	const vars: Record<string, string> = {};
	const styles: Record<string, string> = {};

	if (!padding) {
		return { vars, styles };
	}

	// Handle p (all sides)
	if (padding.p !== undefined && padding.p !== null) {
		const value = normalizePaddingValue(padding.p);
		vars["--juno-section-px"] = value;
		vars["--juno-section-py"] = value;
		// Apply directly as styles so padding works without spacing class
		styles.padding = value;
	} else {
		// Handle px/py (both sides)
		if (padding.px !== undefined && padding.px !== null) {
			const pxValue = normalizePaddingValue(padding.px);
			vars["--juno-section-px"] = pxValue;
			// Apply directly as styles so padding works without spacing class
			styles.paddingLeft = pxValue;
			styles.paddingRight = pxValue;
		}
		if (padding.py !== undefined && padding.py !== null) {
			const pyValue = normalizePaddingValue(padding.py);
			vars["--juno-section-py"] = pyValue;
			// Apply directly as styles so padding works without spacing class
			styles.paddingTop = pyValue;
			styles.paddingBottom = pyValue;
		}

		// Handle individual sides (override CSS variables and px/py)
		if (padding.pl !== undefined && padding.pl !== null) {
			styles.paddingLeft = normalizePaddingValue(padding.pl);
		}
		if (padding.pr !== undefined && padding.pr !== null) {
			styles.paddingRight = normalizePaddingValue(padding.pr);
		}
		if (padding.pt !== undefined && padding.pt !== null) {
			styles.paddingTop = normalizePaddingValue(padding.pt);
		}
		if (padding.pb !== undefined && padding.pb !== null) {
			styles.paddingBottom = normalizePaddingValue(padding.pb);
		}
	}

	return { vars, styles };
}

export type LayoutMarginProps = {
	m?: Margin;
	mx?: Margin;
	my?: Margin;
	mt?: Margin;
	mr?: Margin;
	mb?: Margin;
	ml?: Margin;
};

export const emptyMarginDefaults: Partial<LayoutMarginProps> = {};

export function processLayoutMargin(margin: LayoutMarginProps | undefined): React.CSSProperties {
	const styles: React.CSSProperties = {};

	if (!margin) {
		return styles;
	}

	// Handle m (all sides)
	if (margin.m !== undefined && margin.m !== null) {
		styles.margin = margin.m;
	} else {
		// Handle mx/my (both sides)
		if (margin.mx !== undefined && margin.mx !== null) {
			styles.marginLeft = margin.mx;
			styles.marginRight = margin.mx;
		}
		if (margin.my !== undefined && margin.my !== null) {
			styles.marginTop = margin.my;
			styles.marginBottom = margin.my;
		}

		// Handle individual sides (override mx/my)
		if (margin.ml !== undefined && margin.ml !== null) {
			styles.marginLeft = margin.ml;
		}
		if (margin.mr !== undefined && margin.mr !== null) {
			styles.marginRight = margin.mr;
		}
		if (margin.mt !== undefined && margin.mt !== null) {
			styles.marginTop = margin.mt;
		}
		if (margin.mb !== undefined && margin.mb !== null) {
			styles.marginBottom = margin.mb;
		}
	}

	return styles;
}
