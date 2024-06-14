/**
 * test scenario for ReducerGetThread
 * 
 * - Reducer getThread
 *   - should handle getThreads fulfilled state
 */


import { describe } from 'vitest';
import { getThreads } from '../redux/features/User'; 
import { ThreadSlice } from '../redux/features/User'; 

describe('Threads Reducer - getThreads', () => {
  const initialState = {
    entities: {},
    loading: 'idle',
    error: null,
  };

  it('should handle getThreads fulfilled state', () => {
    const threads = [{ id: 1, title: 'Thread 1' }, { id: 2, title: 'Thread 2' }];
    const state = ThreadSlice.reducer(initialState, getThreads.fulfilled());

    expect(state.loading).toEqual('idle');
    expect(state.error).toBeNull();
    expect(state.entities[1]).toEqual({ id: 1, title: 'Thread 1' });
    expect(state.entities[2]).toEqual({ id: 2, title: 'Thread 2' });
  });

});
