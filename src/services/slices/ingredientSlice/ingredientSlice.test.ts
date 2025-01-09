import ingredientSlice, {
  getIngredients,
  initialState
} from './ingredientSlice';

describe('тестирование редьюсера ingredientSlice', () => {
  describe('тестирование асинхронного экшена getIngredients', () => {
    const actions = {
      pending: {
        type: getIngredients.pending.type,
        payload: null
      },
      rejected: {
        type: getIngredients.rejected.type,
        error: { message: 'error' }
      },
      fulfilled: {
        type: getIngredients.fulfilled.type,
        payload: [
          {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png',
            __v: 0
          }
        ]
      }
    };

    test('тест синхронного экшена getIngredients.pending', () => {
      const state = ingredientSlice(initialState, actions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(actions.pending.payload);
    });

    test('тест синхронного экшена getIngredients.rejected', () => {
      const state = ingredientSlice(initialState, actions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });

    test('тест синхронного экшена getIngredients.fulfilled', () => {
      const state = ingredientSlice(initialState, actions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.ingredients).toEqual(actions.fulfilled.payload);
    });
  });
});
