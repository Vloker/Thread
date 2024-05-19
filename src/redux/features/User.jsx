import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { BASE_URL, getAccessToken } from '../../config/Auth';
import axios from 'axios';


// Threads
export const getThreads = createAsyncThunk('users/getThreads', async () => {
    const response = await axios.get(`${BASE_URL}/threads`);
    return response.data.data.threads;
});

export const getDetailsThread = createAsyncThunk('users/getDetailsThread', async (threadId) => {
    const response = await axios.get(`${BASE_URL}/threads/${threadId}`);
    return response.data.data.detailThread;
});

export const postThread = createAsyncThunk('threads/postThread', async (data) => {
    const response = await axios.post(`${BASE_URL}/threads`, data, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
    return response.data.data.thread;
});

export const postComment = createAsyncThunk('users/postComment', async ({ threadId, content }) => {
    const response = await axios.post(`${BASE_URL}/threads/${threadId}/comments`, { content }, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
    return { threadId, comment: response.data.data.comment };
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



const threadAdapter = createEntityAdapter({
    selectId: (thread) => thread.threadId || thread.id
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
            .addCase(getDetailsThread.fulfilled, (state, action) => {
                threadAdapter.upsertOne(state, action.payload);
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

const UserSlice = createSlice({
    name: 'users',
    initialState: {
        user: null,
        status: 'idle',
        error: null
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
            });
    },
});

export const { selectAll: selectAllThreads, selectById: selectThreadById } = threadAdapter.getSelectors((state) => state.threads);

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export const reducer = {
    threads: ThreadSlice.reducer,
    user: UserSlice.reducer,
};
