import type { BrandProps } from "./types";
import { defaults } from "./types";
import { Logo } from "./variants/Logo";
import { Symbol } from "./variants/Symbol";

export type { BrandProps };

type BrandWithTypeProps = BrandProps & {
	type?: "logo" | "symbol";
};

function BrandRouter({ type = "symbol", ...props }: BrandWithTypeProps) {
	switch (type) {
		case "logo":
			return <Logo {...props} />;
		case "symbol":
			return <Symbol {...props} />;
		default:
			return <Symbol {...props} />;
	}
}

// Compound component pattern: Brand.Logo, Brand.Symbol
export const Brand = Object.assign(BrandRouter, {
	Logo,
	Symbol,
	defaults,
});

export { defaults };
export default Brand;
