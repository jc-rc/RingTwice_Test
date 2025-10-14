
type ButtonProps = {
    label?:string,
    iconSize?: "small" | "medium" | "large",
    iconLeft?: string,
    onClick?: any,
    className?: string
}

function Button(props:ButtonProps = {
    iconLeft: "flag",
    label: "Label",
    iconSize: "medium",
    onClick: undefined,
    className: ""
}) {

switch (props.iconSize) {
    case "small":
        "text-base"
        break;
    case "medium":
        "text-xl"
        break;
    case "large":
        "text-2xl"
        break;

    default:
        break;
}


  return (
    <button className={`flex items-center justify-center rounded-xl px-4 py-2 ${props.className}`} type="button" onClick={props.onClick}>
        <i className={`fa-solid fa-${props.iconLeft} ${props.iconSize}`}></i>
        <p>{props.label}</p>
    </button>
  )
}

export default Button