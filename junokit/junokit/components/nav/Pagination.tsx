import { Button } from "../..";
import { ChevronLeft, ChevronRight } from "../../icons";

type Props = {
	type?: "mini" | "standard";
	size?: "mini" | "small";
	currentPage?: number;
	totalPages?: number;
	onChange?: (page: number) => void;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

export const defaults = {
	type: "standard" as const,
	size: "small" as const,
	currentPage: 1,
	totalPages: 3,
	onChange: () => {},
	className: "",
	style: {} as React.CSSProperties,
};

function Pagination(props: Props) {
	const { type, size, currentPage, totalPages, onChange, className, style, ...divProps } = { ...defaults, ...props };

	const selectedIndex = currentPage;
	// local state to imitate page selection, move this state up to the parent and adjust local functions

	const justifyStyle = type === "mini" ? "justify-end" : "justify-between";
	const classes = `w-full flex flex-row ${justifyStyle} items-center gap-2 ${className}`;

	function handlePageChange(page: number) {
		if (page < 1 || page > totalPages) return;
		onChange(page);
	}

	const LeftButton =
		type === "standard" ? (
			<Button
				size={size}
				variant="ghost"
				disabled={selectedIndex === 1}
				icon={<ChevronLeft />}
				onClick={() => handlePageChange(selectedIndex - 1)}
			>
				Back
			</Button>
		) : (
			<Button
				icon={<ChevronLeft />}
				size={size}
				variant="ghost"
				disabled={selectedIndex === 1}
				onClick={() => handlePageChange(selectedIndex - 1)}
			/>
		);

	const RightButton =
		type === "standard" ? (
			<Button
				size={size}
				variant="ghost"
				disabled={selectedIndex >= totalPages}
				rightIcon={<ChevronRight />}
				onClick={() => handlePageChange(selectedIndex + 1)}
			>
				Next
			</Button>
		) : (
			<Button
				icon={<ChevronRight />}
				size={size}
				variant="ghost"
				disabled={selectedIndex >= totalPages}
				onClick={() => handlePageChange(selectedIndex + 1)}
			/>
		);

	return (
		<div {...divProps} className={classes} style={style}>
			{LeftButton}
			{type === "standard" ? (
				<PaginationArray
					totalPages={totalPages}
					currentPage={selectedIndex}
					handlePageChange={handlePageChange}
					size={size}
				/>
			) : (
				<div className="flex flex-row gap-2">
					{currentPage} of {totalPages}
				</div>
			)}
			{RightButton}
		</div>
	);
}

type PaginationArrayProps = {
	totalPages: number;
	currentPage: number;
	handlePageChange: (page: number) => void;
	size?: "mini" | "small";
};

function PaginationArray({ totalPages, currentPage, handlePageChange, size }: PaginationArrayProps) {
	const createPaginationArray = (totalPages: number, currentPage: number) => {
		let paginationArray = [];

		if (totalPages <= 5) {
			// If the total number of pages is less than or equal to 5, show all pages
			for (let i = 1; i <= totalPages; i++) {
				paginationArray.push(i);
			}
		} else {
			// needs to be refactored into a more elegant solution
			if (currentPage < 4) {
				paginationArray = [1, 2, 3, 4, "...", totalPages];
			} else if (currentPage === 4) {
				paginationArray = [1, "...", 3, 4, 5, "...", totalPages];
			} else if (totalPages - currentPage < 3) {
				paginationArray = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
			} else if (totalPages - currentPage === 3) {
				paginationArray = [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, "...", totalPages];
			} else {
				paginationArray = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
			}
		}

		return paginationArray;
	};

	const paginationArray = createPaginationArray(totalPages, currentPage);

	return (
		<div className="flex flex-row gap-2">
			{paginationArray.map((page, index) => {
				if (page === "...") {
					// biome-ignore lint/suspicious/noArrayIndexKey: well what do we have else?
					return <span key={`${page}${index}`}>...</span>;
				}
				return (
					<Button
						key={page}
						size={size || "medium"}
						variant={currentPage === page ? "light" : "ghost"}
						onClick={() => handlePageChange(page as number)}
					>
						{page}
					</Button>
				);
			})}
		</div>
	);
}

export default Pagination;
Pagination.defaults = defaults;
