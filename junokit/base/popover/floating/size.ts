import type { Middleware, MiddlewareState } from "./types";

type SizeOptions = {
	apply: (state: { rects: { reference: { width: number } }; elements: { floating: HTMLElement } }) => void;
};

/**
 * Size middleware - allows applying size constraints to floating element.
 * Only implements the apply callback pattern used by Popover.
 */
export function size(options: SizeOptions): Middleware {
	return {
		name: "size",
		fn(state: MiddlewareState) {
			const { rects, elements } = state;

			if (elements.floating) {
				options.apply({
					rects: { reference: { width: rects.reference.width } },
					elements: { floating: elements.floating },
				});
			}

			return {};
		},
	};
}
