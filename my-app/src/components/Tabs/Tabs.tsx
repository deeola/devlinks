
import "./Tabs.css";


type TTabs = {
  text: string;
  TabsType?: string;
  default?: boolean;
  img?: string;
  links?: string;
  onClick?: () => void;
  classname?: string
};


export default function Tabs(Props: TTabs) {
  const { text, TabsType, img, onClick, classname } = Props;

  return (
    <button onClick={onClick} className={`tabs ${classname}`} data-tabstype={TabsType}>
      <span className="tabsImg">
        <img src={img} alt="Icon" />
      </span>
      <span className="tabsText">{text}</span>
    </button>
  );
}
