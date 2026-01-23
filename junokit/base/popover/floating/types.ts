/**
 * Minimal floating UI types - only what's needed for Popover positioning.
 */

export type Side = "top" | "bottom" | "left" | "right";
export type Alignment = "start" | "end";
export type Placement = Side | `${Side}-${Alignment}`;
export type Strategy = "absolute" | "fixed";

export type Rect = {
	x: number;
	y: number;
	width: number;
	height: number;
};

export type Coords = {
	x: number;
	y: number;
};

export type MiddlewareState = {
	x: number;
	y: number;
	placement: Placement;
	initialPlacement: Placement;
	strategy: Strategy;
	rects: {
		reference: Rect;
		floating: Rect;
	};
	elements: {
		reference: Element | null;
		floating: HTMLElement | null;
	};
};

export type MiddlewareReturn = Partial<Coords> & {
	data?: Record<string, unknown>;
	reset?: boolean;
};

export type Middleware = {
	name: string;
	fn: (state: MiddlewareState) => MiddlewareReturn;
};
