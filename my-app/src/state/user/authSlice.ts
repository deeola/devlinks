import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

// Define types for user and password
interface LoginCredentials {
    user: string;
    pwd: string;
}

// Define types for user data
interface UserData {
    accessToken: string;
    roles: string[];
}

const LOGIN_URL = '/auth'; // Update with your actual login URL

// Create the login async thunk
export const login = createAsyncThunk<UserData, LoginCredentials>(
    LOGIN_URL,
    async ({ user, pwd }, { rejectWithValue }) => {
        try {
            const response = await axios.post(LOGIN_URL, { user, pwd });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

interface AuthState {
    user: UserData | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    accessToken: string | null;
}

const initialState: AuthState = {
    user: null,
    status: 'idle',
    error: null,
    accessToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';

            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Login failed';
            });
    },
});

export default authSlice.reducer;
