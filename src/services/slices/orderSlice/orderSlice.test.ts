import orderSlice, { initialState, getOrderByNumber } from './orderSlice';

describe('тестирование редьюсера orderSlice', () => {
  describe('тестирование асинхронного экшена getOrderByNumber', () => {
    const actions = {
      pending: {
        type: getOrderByNumber.pending.type,
        payload: null
      },
      rejected: {
        type: getOrderByNumber.rejected.type,
        error: { message: 'error' }
      },
      fulfilled: {
        type: getOrderByNumber.fulfilled.type,
        payload: {
          orders: [
            {
              _id: '675f1e3d750864001d37175b',
              ingredients: [
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa0941',
                '643d69a5c3f7b9001cfa093c'
              ],
              status: 'done',
              name: 'Краторный био-марсианский бургер',
              createdAt: '2024-12-15T18:21:49.083Z',
              updatedAt: '2024-12-15T18:21:50.055Z',
              number: 62879
            }
          ]
        }
      }
    };

    test('тест синхронного экшена getOrderByNumber.pending', () => {
      const state = orderSlice(initialState, actions.pending);
      expect(state.request).toBe(true);
      expect(state.error).toBe(actions.pending.payload);
    });
    test('тест синхронного экшена getOrderByNumber.rejected', () => {
      const state = orderSlice(initialState, actions.rejected);
      expect(state.request).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });
    test('тест синхронного экшена getOrderByNumber.fulfilled', () => {
      const state = orderSlice(initialState, actions.fulfilled);
      expect(state.request).toBe(false);
      expect(state.error).toBe(null);
      expect(state.orderByNumberResponse).toBe(
        actions.fulfilled.payload.orders[0]
      );
    });
  });
});
