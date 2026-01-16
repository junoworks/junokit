import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../base/popover";
import ProfileCard from "../../base/profile/ProfileCard";

export type ProfileMenuProps = {
	name?: React.ReactNode;
	size?: "small" | "medium" | "large";
	variant?: "light" | "soft" | "ghost";

	avatar?: React.ReactElement;
	avatarPosition?: "left" | "right";

	icon?: React.ReactElement | ((props: { open: boolean }) => React.ReactElement);

	focused?: boolean;
	children?: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;

	side?: "top" | "bottom" | "left" | "right";
	align?: "start" | "center" | "end";

	className?: string;
};

export const defaults = {
	size: "medium" as const,
	variant: "light" as const,
	avatarPosition: "left" as const,
	side: "bottom" as const,
	align: "start" as const,
};

function ProfileMenu(props: ProfileMenuProps) {
	const {
		name,
		size,
		variant,
		icon,
		avatar,
		avatarPosition,
		focused,
		children,
		open: controlledOpen,
		onOpenChange,
		side,
		align,
		...rest
	} = { ...defaults, ...props };

	const [internalOpen, setInternalOpen] = useState(false);
	const isControlled = controlledOpen !== undefined;
	const isOpen = isControlled ? controlledOpen : internalOpen;

	const handleOpenChange = (open: boolean) => {
		if (!isControlled) setInternalOpen(open);
		onOpenChange?.(open);
	};

	const resolvedIcon = typeof icon === "function" ? icon({ open: isOpen }) : icon;
	const contentClassName = size ? `juno-elements-${size}` : "";

	return (
		<Popover open={isOpen} onOpenChange={handleOpenChange} size={size}>
			<PopoverTrigger>
				<ProfileCard
					{...rest}
					name={name}
					size={size}
					variant={variant}
					avatar={avatar}
					avatarPosition={avatarPosition}
					icon={resolvedIcon}
					focused={isOpen || focused}
				/>
			</PopoverTrigger>
			<PopoverContent side={side} align={align} matchTriggerWidth className={contentClassName}>
				{children}
			</PopoverContent>
		</Popover>
	);
}

export default ProfileMenu;
ProfileMenu.defaults = defaults;
