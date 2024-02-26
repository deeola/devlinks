import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Customize from "./pages/Customize/Customize";
import Preview from "./pages/Preview/Preview";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { RootState } from "../src/state/store";
import PrivateRoute from "./private/PrivateRoute";
import Profile from "./pages/Profile/Profile";
import { selectAuthStatus } from "./state/user/authSlice";
import Layout from "./pages/auth/Layout";
import PersistLogin from "./pages/auth/PersistLogin";
import Missing from "./pages/auth/Missing";
import RequireAuth from "./pages/auth/RequireAuth";

// function App() {
//   const [myLocalStorageData, setMyLocalStorageData] = useState(false);
//   const Navigate = useNavigate();

//   const isAuthenticated = useSelector(selectAuthStatus);

//   useEffect(() => {
//     console.log("isAuthenticated on mount:", isAuthenticated);

//     if (localStorage.getItem("isLoggedIn") === "true") {
//       Navigate("/customize");
//     } else {
//       Navigate("/");
//     }

//     setTimeout(function () {
//       localStorage.removeItem("isLoggedIn");
//     }, 20000);

//     // return () => clearTimeout(timeoutId);

//   }, [isAuthenticated, Navigate]);

//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Auth />} />
//         <Route path="/customize" element={<Customize />} />
//         <Route
//           path="/"
//           element={
//             <PrivateRoute

//             />
//           }
//         >
//           <Route path="/preview" element={<Preview />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// }


function App() {

  return (
    <Routes>
      <Route >
        {/* public routes */}
        <Route path="/" element={<Login />} /> 
        <Route path="register" element={<Auth />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={ <RequireAuth /> }>
            <Route path="customize" element={<Customize />} />
          </Route>
          <Route element={ <RequireAuth /> }>
            <Route path="preview" element={<Preview />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
