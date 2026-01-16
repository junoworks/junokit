import { useCurrentBreakpoint, useResponsive } from "./matchMedia";

export default function Frame() {
	const v = useResponsive({ default: "d", sm: "s", md: "n", lg: "l" });
	const cb = useCurrentBreakpoint();
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-8">
			<p> ..[{v}]..</p>
			<p> ..[{cb}]..</p>
		</div>
	);
}
