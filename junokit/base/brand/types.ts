import type React from "react";

export type BrandSize = React.CSSProperties["height"];

export type BrandProps = {
	src?: string;
	size?: BrandSize;
	inverted?: boolean;
	aspectRatio?: number;
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const defaults = {
	size: "1.5em" as BrandSize,
	inverted: false,
	aspectRatio: 1,
};
