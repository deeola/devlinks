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
  datatestid?: string;
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
    datatestid
  } = Props;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`button-base ${classname}`}
      data-subtype={backgroundSubtype}
      data-buttontype={buttonType}
      data-testid={datatestid}
    >
      {text}
    </button>
  );
}
