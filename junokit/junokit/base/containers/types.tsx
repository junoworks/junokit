export type FlexDirection = "row" | "column";
export type StandardContainerProps = {
	outline?: boolean;
	overflow?: "auto" | "hidden" | "visible" | "scroll" | "y-scroll" | "x-scroll";
	corners?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
	padding?: string;
	margin?: string;
	width?: string;
	height?: string;
	gap?: string;
};

export type Padding = {
	p?: number;
	px?: number;
	py?: number;
	pt?: number;
	pr?: number;
	pb?: number;
	pl?: number;
};

export type Width = number | string;
export type Height = number | string;
export type Gap = number | string | undefined;

export type Margin = {
	m?: number;
	mx?: number;
	my?: number;
	mt?: number;
	mr?: number;
	mb?: number;
	ml?: number;
};

export type Corners = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
export type Justify = "start" | "center" | "end" | "between";
export type Align = "start" | "center" | "end" | "stretch";
