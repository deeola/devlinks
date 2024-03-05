
import "./Tabs.css";


type Tabs = {
  text: string;
  TabsType?: string;
  default?: boolean;
  img?: string;
  links?: string;
  onClick?: () => void;
};

export default function Tabs(Props: Tabs) {
  const { text, TabsType, img, links, onClick } = Props;

  return (
    <button onClick={onClick} className="tabs" data-tabstype={TabsType}>
      {" "}
      <span className="tabsImg">
        <img src={img} alt="Icon" />
      </span>
      <span className="tabsText">{text}</span>
      
    </button>
  );
}
