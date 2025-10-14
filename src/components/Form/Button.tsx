
type ButtonProps = {
    label:string,
    iconSize: "small" | "medium" | "large",
    iconLeft: string,
    onClick: ()=> void
}

function Button(props:ButtonProps = {
    iconLeft: "flag",
    label: "Label",
    iconSize: "medium",
    onClick: ()=>{}
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
    <button className="rounded-4xl p-4" type="button" onClick={props.onClick}>
        <i className={`fa-solid fa-${props.iconLeft} ${props.iconSize}`}></i>
        <p>{props.label}</p>
    </button>
  )
}

export default Button