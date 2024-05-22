import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, getAccessToken, setAccessToken } from '../../config/Auth';

// Threads
export const getThreads = createAsyncThunk('threads/getThreads', async () => {
    const response = await axios.get(`${BASE_URL}/threads`);
    return response.data.data.threads;
});

export const getDetailsThread = createAsyncThunk('threads/getDetailsThread', async (threadId) => {
    const response = await axios.get(`${BASE_URL}/threads/${threadId}`);
    return response.data.data.detailThread;
});

export const postThread = createAsyncThunk('threads/postThread', async ({title, body, category}) => {
    const response = await axios.post(`${BASE_URL}/threads`, { title, body, category }, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
    return response.data.data.thread;
});

export const postComment = createAsyncThunk('threads/postComment', async ({ threadId, content }) => {
    try {
        const response = await axios.post(`${BASE_URL}/threads/${threadId}/comments`, { content }, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        });
        return { threadId, comment: response.data.data.comment };
    } catch (error) {
        throw error;
    }
});

// User
export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const response = await axios.get(`${BASE_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
    return response.data.data.user;
});

export const login = createAsyncThunk('users/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, { email, password });
        const data = response.data.data;
        setAccessToken(data.token);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const register = createAsyncThunk('users/register', async ({ name, email, password }, { rejectWithValue }) => {
    try {
        await axios.post(`${BASE_URL}/register`, { name, email, password });
        return { success: true };
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const threadAdapter = createEntityAdapter({
    selectId: (thread) => thread.id
});

const ThreadSlice = createSlice({
    name: 'threads',
    initialState: threadAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getThreads.fulfilled, (state, action) => {
                threadAdapter.setAll(state, action.payload);
            })
            .addCase(postThread.fulfilled, (state, action) => {
                threadAdapter.addOne(state, action.payload);
            })
            .addCase(postComment.fulfilled, (state, action) => {
                const { threadId, comment } = action.payload;
                const thread = state.entities[threadId];
                if (thread) {
                    thread.comments = thread.comments || [];
                    thread.comments.push(comment);
                }
            });
    }
});

const ThreadDetailsSlice = createSlice({
    name: 'threadsDetails',
    initialState: {
        thread: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDetailsThread.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDetailsThread.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.thread = action.payload;
            })
            .addCase(getDetailsThread.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

const UserSlice = createSlice({
    name: 'users',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
        isLoggedIn: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message;
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(register.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message;
            });
    },
});

export const { selectAll: selectAllThreads, selectById: selectThreadById } = threadAdapter.getSelectors((state) => state.threads);
export const selectDetailsThread = (state) => state.threadsDetails.thread;

export const selectUser = (state) => state.users.user;
export const selectUserStatus = (state) => state.users.status;
export const selectUserError = (state) => state.users.error;
export const selectIsLoggedIn = (state) => state.users.isLoggedIn;

export const reducer = {
    threadsDetails: ThreadDetailsSlice.reducer,
    threads: ThreadSlice.reducer,
    users: UserSlice.reducer,
};
