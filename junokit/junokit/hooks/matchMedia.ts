import { useSyncExternalStore } from "react";

const BREAKPOINTS = {
	sm: "(min-width: 640px)",
	md: "(min-width: 768px)",
	lg: "(min-width: 1024px)",
	xl: "(min-width: 1280px)",
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

type BreakpointState = {
	[K in Breakpoint]: boolean;
};

type ResponsiveValue<T> = {
	default: T;
} & {
	[K in Breakpoint]?: T;
};

const listeners = new Set<() => void>();
type MQLs = [MediaQueryList, MediaQueryList, MediaQueryList, MediaQueryList];
const mqls = Object.values(BREAKPOINTS).map((query) => window.matchMedia(query)) as MQLs;

const handleChange = () => {
	for (const listener of listeners) {
		listener();
	}
};
for (const mql of mqls) {
	mql.addEventListener("change", handleChange);
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

let cachedSnapshot: BreakpointState = {
	sm: mqls[0].matches,
	md: mqls[1].matches,
	lg: mqls[2].matches,
	xl: mqls[3].matches,
};

function getSnapshot(): BreakpointState {
	const newSnapshot = {
		sm: mqls[0].matches,
		md: mqls[1].matches,
		lg: mqls[2].matches,
		xl: mqls[3].matches,
	};

	if (
		cachedSnapshot.sm === newSnapshot.sm &&
		cachedSnapshot.md === newSnapshot.md &&
		cachedSnapshot.lg === newSnapshot.lg &&
		cachedSnapshot.xl === newSnapshot.xl
	) {
		return cachedSnapshot;
	}

	cachedSnapshot = newSnapshot;
	return newSnapshot;
}

/**
 * Returns the current state of all breakpoints as an object.
 * Each property is true when that breakpoint's min-width is matched.
 *
 * @example
 * const breakpoints = useBreakpoints();
 * // { sm: true, md: false, lg: false, xl: false }
 */
export function useBreakpoints(): BreakpointState {
	return useSyncExternalStore(subscribe, getSnapshot);
}

/**
 * Returns the name of the largest currently matching breakpoint.
 * Uses mobile-first approach - returns "default" when no breakpoints match.
 *
 * @returns The active breakpoint name: "xl", "lg", "md", "sm", or "default"
 */
export function useCurrentBreakpoint(): Breakpoint | "default" {
	const breakpoints = useBreakpoints();
	if (breakpoints.xl) return "xl";
	if (breakpoints.lg) return "lg";
	if (breakpoints.md) return "md";
	if (breakpoints.sm) return "sm";
	return "default";
}

/**
 * Returns the appropriate value from a responsive object based on the current breakpoint.
 * Uses mobile-first approach: if a value isn't defined for the current breakpoint,
 * falls back to the next smaller breakpoint.
 *
 * @param values - Object with responsive values. Must include 'default'.
 * @returns The value matching the current breakpoint
 *
 * @example
 * const columns = useResponsive({
 *   default: 1,
 *   sm: 2,
 *   md: 3,
 *   lg: 4
 * });
 */
export function useResponsive<T>(values: ResponsiveValue<T>): T {
	const currentBreakpoint = useCurrentBreakpoint();
	const breakpointOrder = ["default", "sm", "md", "lg", "xl"] as const;
	const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
	for (let i = currentIndex; i >= 0; i--) {
		const bp = breakpointOrder[i];
		if (bp && bp in values) {
			return values[bp] as T;
		}
	}

	return values.default;
}
