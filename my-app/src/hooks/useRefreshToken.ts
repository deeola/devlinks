import axios from "../api/axios";
import useAuth from "./useAuth";
import { setNewUser } from "../state/user/authSlice";


const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {

    const response = await axios.get("/refresh", {
      withCredentials: true,
    });

    console.log(response.data.accessToken, "response.data.accessToken")

    setNewUser((prev: any) =>{
        return {
            ...prev,
            username: response.data.username,
            accessToken: response.data.accessToken,
        }
    })



    setAuth((prev: any) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
        user: response.data.username,
      };
    });



    return response.data.accessToken;
  };
  console.log("refresh", refresh);
  return refresh;
};

export default useRefreshToken;
