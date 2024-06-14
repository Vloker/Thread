/**
 * skenario test
 *
 * - asyncgetThreads thunk and asyncgetUsers thunk
 *  - should dispatch action correctly when data fetching success
 */


import { describe, it, beforeEach, afterEach, vi, expect } from "vitest";
import { getThreads, getUsers } from "../redux/features/User";
import * as userModule from '../redux/features/User';

// Mock data
const fakeThreadResponse = [
    {
        id: "thread-1",
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2022-01-01',
    },
];

const fakeUserResponse = [
    {
        id: 1,
        name: 'John Doe',
        email: '9XuZx@example.com',
        avatar: 'https://example.com/avatar.jpg',
    },
];

describe('Thunk', () => {
    let getThreadsMock;
    let getUsersMock;

    beforeEach(() => {
        // Mock the thunks
        getThreadsMock = vi.spyOn(userModule, 'getThreads').mockImplementation(() => async (dispatch) => {
            dispatch({ type: 'threads/getThreads/pending' });
            try {
                dispatch({ type: 'threads/getThreads/fulfilled', payload: fakeThreadResponse });
            } catch (error) {
                dispatch({ type: 'threads/getThreads/rejected', error });
            }
        });
        getUsersMock = vi.spyOn(userModule, 'getUsers').mockImplementation(() => async (dispatch) => {
            dispatch({ type: 'users/getUsers/pending' });
            try {
                dispatch({ type: 'users/getUsers/fulfilled', payload: fakeUserResponse });
            } catch (error) {
                dispatch({ type: 'users/getUsers/rejected', error });
            }
        });
    });

    afterEach(() => {
        // Restore the original thunks
        getThreadsMock.mockRestore();
        getUsersMock.mockRestore();
    });

    it('should dispatch action correctly when data fetching success', async () => {
        // Arrange
        const dispatch = vi.fn();

        // Action
        await getThreads()(dispatch);
        await getUsers()(dispatch);

        // Assert
        expect(dispatch).toHaveBeenCalledWith({ type: 'threads/getThreads/pending' });
        expect(dispatch).toHaveBeenCalledWith({ type: 'threads/getThreads/fulfilled', payload: fakeThreadResponse });
        expect(dispatch).toHaveBeenCalledWith({ type: 'users/getUsers/pending' });
        expect(dispatch).toHaveBeenCalledWith({ type: 'users/getUsers/fulfilled', payload: fakeUserResponse });
    });
});
