import "./App.css";
// import Notification from "./components/notification/Notification";
import Customize from "./pages/Customize/Customize";
import Preview from "./pages/Preview/Preview";
import linkImage from "./assets/images/icon-link-copied-to-clipboard.svg"
import Auth from "./pages/Auth";
import Login from "./pages/Login";

import { Routes, Route, Outlet } from "react-router-dom";
import PrivateRoute from "./private/PrivateRoute";

function App() {

  
const isAuthenticated = true;

  return (
    <div className="App">
 <Routes>

<Route  path="/" element={<Login/>} />

 <Route path="/customize" element={
  <PrivateRoute isAuthenticated={isAuthenticated}>
    <Customize />
  </PrivateRoute>
 } />

 <Route path="/preview" element={<Preview />} />
 <Route path="/register" element={<Auth/>} />  

 



</Routes>
    </div>
   
   
  );
}

export default App;
