import { useEffect, useMemo, useRef, useState } from "react";
import { Button, SegmentedSwitch } from "../../../";
import { Popover, PopoverTrigger } from "../../../base/popover";
import { getYearRange, MONTH_NAMES } from "../utils";
import { format, setMonth, setYear, startOfMonth } from "../utils/dateHelpers";

type MonthYearSelectorProps = {
	size?: "small" | "medium";
	currentMonth: Date;
	onMonthChange: (newMonth: Date) => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onMonthChange">;

export function MonthYearSelector({ size = "medium", currentMonth, onMonthChange, ...rest }: MonthYearSelectorProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [view, setView] = useState<"month" | "year">("month");
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const currentYear = currentMonth.getFullYear();
	const currentMonthIndex = currentMonth.getMonth();

	const handleMonthSelect = (monthIndex: number) => {
		const newDate = startOfMonth(setMonth(currentMonth, monthIndex));
		onMonthChange(newDate);
		setIsOpen(false);
		setView("month");
	};

	const handleYearSelect = (year: number) => {
		const newDate = startOfMonth(setYear(currentMonth, year));
		onMonthChange(newDate);
	};

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (!open) {
			setView("month");
		}
	};

	const dropdownSize = {
		small: "w-40 top-6 rounded-md gap-1",
		medium: "w-48 top-9 rounded-md gap-1",
	}[size ?? "medium"];

	const contentSize = {
		small: "max-h-[100px]",
		medium: "max-h-[100px]",
	}[size ?? "medium"];

	// Scroll to current year when year view opens
	useEffect(() => {
		if (view === "year" && scrollContainerRef.current) {
			const container = scrollContainerRef.current;
			const yearButton = container.querySelector(`[data-year="${currentYear}"]`) as HTMLElement;
			if (yearButton) {
				const buttonTop = yearButton.offsetTop;
				const buttonHeight = yearButton.offsetHeight;
				const containerHeight = container.clientHeight;
				container.scrollTop = buttonTop - containerHeight / 2 + buttonHeight / 2;
			}
		}
	}, [view, currentYear]);

	return (
		<Popover {...rest} open={isOpen} onOpenChange={handleOpenChange} size="small">
			<PopoverTrigger>
				<Button size={size} variant="ghost" className="!py-0 !h-6">
					{format(currentMonth, "MMMM yyyy")}
				</Button>
			</PopoverTrigger>

			{isOpen && (
				<div
					className={`absolute left-1/2 -translate-x-1/2 mt-1 ${dropdownSize} p-0 flex flex-col shadow-lg bg-base-0 text-base-content outline-[0.5px] -outline-offset-[0.5px] outline-current/20 z-50`}
					onKeyDown={(e) => e.stopPropagation()}
				>
					{/* View toggle tabs */}
					<div className="p-1 pb-0">
						<SegmentedSwitch
							size="small"
							equalWidth
							className="!h-6 w-full"
							value={view}
							onChange={(val) => setView(val as "month" | "year")}
							options={[
								{ value: "month", label: "Month" },
								{ value: "year", label: "Year" },
							]}
						/>
					</div>

					{/* Content area with fixed height */}
					<div ref={scrollContainerRef} data-lenis-prevent className={`${contentSize} overflow-y-scroll`}>
						{view === "month" && (
							<div className="grid grid-cols-3 gap-1 pt-0 p-1 h-full content-start">
								{MONTH_NAMES.map((month, index) => (
									<Button
										key={month}
										size="mini"
										tabIndex={index === currentMonthIndex ? 0 : -1}
										variant={index === currentMonthIndex ? "solid" : "ghost"}
										color={index === currentMonthIndex ? "primary" : "base"}
										onClick={() => handleMonthSelect(index)}
									>
										{month.slice(0, 3)}
									</Button>
								))}
							</div>
						)}

						{view === "year" && (
							<div className="p-1 pt-0">
								<YearGrid currentYear={currentYear} onYearSelect={handleYearSelect} />
							</div>
						)}
					</div>
				</div>
			)}
		</Popover>
	);
}

function YearGrid({ currentYear, onYearSelect }: { currentYear: number; onYearSelect: (year: number) => void }) {
	const years = useMemo(() => getYearRange(new Date().getFullYear(), 50), []);

	return (
		<div className="grid grid-cols-4 gap-1 content-start">
			{years.map((year) => (
				<Button
					key={year}
					size="mini"
					className="!p-0"
					tabIndex={year === currentYear ? 0 : -1}
					variant={year === currentYear ? "solid" : "ghost"}
					color={year === currentYear ? "primary" : "base"}
					data-year={year}
					onClick={() => onYearSelect(year)}
				>
					{year}
				</Button>
			))}
		</div>
	);
}
