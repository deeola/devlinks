
import axios, { axiosPrivate } from '../api/axios';
import { RootState } from '../state/store';
import { setUser } from '../state/user/authSlice';
import { useSelector } from 'react-redux';





const useRefreshToken = () => {
    // const { setAuth } = useAuth();

     const myAccessToken = useSelector((state: RootState) => state.auth.accessToken);

    const refresh = async () => {
        try {
            const response = await axios.get('/refresh', {
                withCredentials: true,
            });

            console.log(response.data.accessToken, "response.data.accessToken");
            return response.data.accessToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }
    return refresh;
};

export default useRefreshToken;