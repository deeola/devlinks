import "./Button.css";

type Color = "active"| "secondary" | boolean;

type Buttons = {
  text: string;
  buttonType?: string;
  backgroundSubtype?: Color;
  classname?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  type?: "submit" | "button" | "reset";
};

export default function Button(Props: Buttons) {
  const {
    text,
    buttonType,
    backgroundSubtype,
    classname,
    onClick,
    isDisabled,
    type,
  } = Props;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`bgColor ${classname}`}
      data-subtype={backgroundSubtype}
      data-buttontype={buttonType}
    >
      {text}
    </button>
  );
}
