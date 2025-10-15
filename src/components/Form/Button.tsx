
type ButtonProps = {
	label?: string,
	iconSize?: "small" | "medium" | "large",
	iconLeft?: string,
	onClick?: any,
	className?: string,
	disabled?: boolean,
}

function Button(props: ButtonProps = {
	iconLeft: "flag",
	label: "Label",
	iconSize: "medium",
	onClick: undefined,
	className: "",
	disabled: false,
}) {
	const iconSizeClass = props.iconSize === 'small' ? 'text-base' : props.iconSize === 'large' ? 'text-2xl' : 'text-xl'

	return (
		<button
			type="button"
			onClick={props.onClick}
			disabled={props.disabled}
			className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed ${props.className}`}
		>
			{i18nIcon(props.iconLeft, iconSizeClass)}
			<p>{props.label}</p>
		</button>
	)
}

function i18nIcon(name?: string, sizeClass?: string) {
	if (!name) return null
	return <i className={`fa-solid fa-${name} ${sizeClass}`}></i>
}

export default Button