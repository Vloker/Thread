/**
 * test scenario for ReducerPostComment
 * 
 * - Reducer postComment
 *   - should handle postThread fulfilled state
 */


import { postThread, ThreadSlice, threadAdapter } from '../redux/features/User'; 
import { describe, it, expect } from 'vitest';

describe('Threads Reducer - postThread', () => {
  const initialState = threadAdapter.getInitialState();

  it('should handle postThread fulfilled state', () => {
    const newThread = { id: 1, title: 'New Thread', body: 'Body of the new thread', category: 'General' };
    const state = ThreadSlice.reducer(initialState, postThread.fulfilled(newThread));

    expect(state.entities[1]).toEqual(newThread);
  });
});
