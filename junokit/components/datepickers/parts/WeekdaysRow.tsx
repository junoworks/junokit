import type { CalendarSize, WeekStart } from "../types";
import { getWeekdayLabels } from "../utils";

type WeekdaysRowProps = {
	weekStart: WeekStart;
	size: CalendarSize;
	standalone?: boolean;
} & Omit<React.HTMLAttributes<HTMLUListElement>, "weekStart">;

export function WeekdaysRow({ weekStart, size, standalone = false, ...rest }: WeekdaysRowProps) {
	const weekdayLabels = getWeekdayLabels(weekStart);

	const paddingStyles: Record<CalendarSize, string> = {
		medium: "p-2",
		small: "p-1.5",
	};

	const gapStyles: Record<CalendarSize, string> = {
		medium: "gap-1",
		small: "gap-0.5",
	};

	return (
		<ul
			{...rest}
			role="row"
			aria-label="Days of the week"
			className={`flex flex-row w-full
				${
					standalone
						? `${paddingStyles[size]} border-b-[0.5px] border-current/20 group-hover/calendar:border-current/30`
						: size === "small"
							? "pt-1"
							: "pt-1.5"
				}
				${gapStyles[size]}
				transition-all duration-75 text-center
				text-current/50 font-light 
				${rest.className}
			`}
		>
			{weekdayLabels.map((day) => (
				<li key={day} className="flex-grow-1 w-full text-center" role="columnheader">
					{day}
				</li>
			))}
		</ul>
	);
}
