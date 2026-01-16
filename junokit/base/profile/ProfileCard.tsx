import { forwardRef } from "react";

export type ProfileCardProps = {
	name?: React.ReactNode;
	size?: "small" | "medium" | "large";
	variant?: "light" | "soft" | "ghost";

	avatar?: React.ReactElement;
	avatarPosition?: "left" | "right";

	icon?: React.ReactElement;
	focused?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const defaults = {
	size: "medium" as const,
	variant: "light" as const,
	avatarPosition: "left" as const,
};

const ProfileCard = forwardRef<HTMLDivElement, ProfileCardProps>((props, ref) => {
	const {
		name,
		size,
		variant,
		icon,
		focused,

		avatar,
		avatarPosition,

		className,

		...rest
	} = { ...defaults, ...props };

	const classes = [
		"juno-profile-card",
		`juno-profile-card-${size}`,
		`juno-profile-card-${variant}`,
		"relative flex h-fit w-fit max-w-full",
		"items-center justify-between cursor-default transition-all duration-150 group",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div
			ref={ref}
			{...rest}
			className={classes}
			data-avatar-position={avatarPosition}
			data-focused={focused || undefined}
		>
			<div className="juno-profile-card-content">
				{avatar}
				{name && <span className="juno-profile-card-name">{name}</span>}
			</div>
			{icon}
		</div>
	);
});

const ProfileCardWithDefaults = ProfileCard as typeof ProfileCard & { defaults: typeof defaults };
ProfileCardWithDefaults.defaults = defaults;

export default ProfileCardWithDefaults;
