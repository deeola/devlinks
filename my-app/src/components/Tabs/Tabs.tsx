
import "./Tabs.css";


type TTabs = {
  text: string;
  TabsType?: string;
  default?: boolean;
  img?: string;
  links?: string;
  onClick?: () => void;
};


export default function Tabs(Props: TTabs) {
  const { text, TabsType, img, onClick } = Props;

  return (
    <button onClick={onClick} className="tabs" data-tabstype={TabsType}>
      <span className="tabsImg">
        <img src={img} alt="Icon" />
      </span>
      <span className="tabsText">{text}</span>
    </button>
  );
}
