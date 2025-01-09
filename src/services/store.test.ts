import store, { rootReducer } from '../services/store';

test('rootReducer возвращает начальное состояние', () => {
  const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

  const storeState = store.getState();

  expect(initialState).toEqual(storeState);
});
