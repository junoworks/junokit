import { IonIcon } from "@ionic/react";
import Icon from "@mui/material/Icon";
import { forwardRef } from "react";
import type { IconProps, IconWeight } from "./types";

type IconConfig = {
	ionic: string | "use-iconoir" | "use-material";
	iconoir: React.ComponentType<any> | "use-ionic" | "use-material";
	material: string | { name: string; filled?: boolean; transform?: string } | "use-ionic" | "use-iconoir";
};

export function createIcon(config: IconConfig) {
	return forwardRef<HTMLDivElement, IconProps>(function IconComponent(
		{ library = "iconoir", color, size, weight = "default", ...rest },
		ref,
	) {
		const colorStyles = color ? `text-${color} ` : "";

		// When size prop is provided, use it directly
		// Otherwise, icons fill the wrapper which is sized by CSS variable
		const hasExplicitSize = size !== undefined;
		const iconSize = hasExplicitSize ? size : "100%";

		// Helper render functions
		const renderIonic = () => {
			const strokeWidth: Record<IconWeight, string> = {
				thin: "24px",
				default: "32px",
				thick: "54px",
			};
			return (
				<IonIcon
					icon={config.ionic as string}
					style={{
						width: iconSize,
						height: iconSize,
						"--ionicon-stroke-width": strokeWidth[weight],
					}}
					className="block"
				/>
			);
		};

		const renderIconoir = () => {
			const strokeWidthMap: Record<IconWeight, number> = {
				thin: 1,
				default: 1.5,
				thick: 2.5,
			};
			const IconoirIcon = config.iconoir as React.ComponentType<any>;
			return <IconoirIcon strokeWidth={strokeWidthMap[weight]} width={iconSize} height={iconSize} />;
		};

		const renderMaterial = () => {
			const fontWeight: Record<IconWeight, number> = {
				thin: 300,
				default: 400,
				thick: 600,
			};
			const materialConfig =
				typeof config.material === "string"
					? { name: config.material, filled: false, transform: undefined }
					: typeof config.material === "object" && "name" in config.material
						? config.material
						: { name: "", filled: false, transform: undefined };

			const fill = materialConfig.filled ? 1 : 0;
			// Material icons are font-based, so fontSize: 100% doesn't work like SVGs
			// Use CSS variable directly when no explicit size
			const materialSize = hasExplicitSize ? size : "var(--icon-size, 1em)";
			return (
				<Icon
					className={"material-symbols-rounded block"}
					sx={{
						fontSize: materialSize,
						fontVariationSettings: `'wght' ${fontWeight[weight]}, 'FILL' ${fill}`,
						width: materialSize,
						height: materialSize,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						...(materialConfig.transform && { transform: materialConfig.transform }),
					}}
				>
					{materialConfig.name}
				</Icon>
			);
		};

		// Ionic component with fallback support
		const IonicComponent = () => {
			if (config.ionic === "use-iconoir") {
				return renderIconoir();
			}
			if (config.ionic === "use-material") {
				return renderMaterial();
			}
			return renderIonic();
		};

		// Iconoir component with fallback support
		const IconoirComponent = () => {
			if (config.iconoir === "use-ionic") {
				return renderIonic();
			}
			if (config.iconoir === "use-material") {
				return renderMaterial();
			}
			return renderIconoir();
		};

		// Material component with fallback support
		const MaterialComponent = () => {
			if (config.material === "use-ionic") {
				return renderIonic();
			}
			if (config.material === "use-iconoir") {
				return renderIconoir();
			}
			return renderMaterial();
		};

		const libraryMap = {
			ionic: <IonicComponent />,
			iconoir: <IconoirComponent />,
			material: <MaterialComponent />,
		};

		const wrapperClass = hasExplicitSize ? "" : "juno-icon";
		const wrapperStyle = hasExplicitSize ? { width: size, height: size } : undefined;
		const classes = `${wrapperClass} flex-shrink-0 ${colorStyles} ${rest.className || ""}`.trim();

		return (
			<div ref={ref} {...rest} className={classes} style={{ ...rest.style, ...wrapperStyle }}>
				{libraryMap[library]}
			</div>
		);
	});
}
