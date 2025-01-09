import feedSlice, { getFeeds, initialState } from './feedSlice';

describe('тестирование редьюсера feedSlice', () => {
  describe('тестирование асинхронного экшена getFeeds', () => {
    const actions = {
      pending: {
        type: getFeeds.pending.type,
        payload: null
      },
      rejected: {
        type: getFeeds.rejected.type,
        error: { message: 'error' }
      },
      fulfilled: {
        type: getFeeds.fulfilled.type,
        payload: {
          orders: [
            {
              _id: '677d0f0e750864001d377a69',
              ingredients: [
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa093e',
                '643d69a5c3f7b9001cfa093c'
              ],
              status: 'done',
              name: 'Краторный люминесцентный бургер',
              createdAt: '2025-01-07T11:25:02.643Z',
              updatedAt: '2025-01-07T11:25:03.601Z',
              number: 64933
            },
            {
              _id: '677d0e94750864001d377a67',
              ingredients: [
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa093e',
                '643d69a5c3f7b9001cfa093c'
              ],
              status: 'done',
              name: 'Краторный люминесцентный бургер',
              createdAt: '2025-01-07T11:23:00.624Z',
              updatedAt: '2025-01-07T11:23:03.539Z',
              number: 64932
            }
          ],
          total: 2
        }
      }
    };

    test('тест синхронного экшена getFeeds.pending', () => {
      const state = feedSlice(initialState, actions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(actions.pending.payload);
    });

    test('тест синхронного экшена getFeeds.rejected', () => {
      const state = feedSlice(initialState, actions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });

    test('тест синхронного экшена getFeeds.fulfilled', () => {
      const state = feedSlice(initialState, actions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.total).toBe(2);
      expect(state.orders).toEqual(actions.fulfilled.payload.orders);
    });
  });
});
