import "./App.css";
// import Notification from "./components/notification/Notification";
import Customize from "./pages/Customize/Customize";
import Preview from "./pages/Preview/Preview";
import linkImage from "./assets/images/icon-link-copied-to-clipboard.svg"
import Auth from "./pages/Auth";

function App() {
  return (
    <div className="App">
       {/* <Customize /> */}
     {/* <Preview /> 
     <Notification text="The link has been copied to your clipboard!" img={linkImage} /> */}

     <Auth />
    </div>
  );
}

export default App;
