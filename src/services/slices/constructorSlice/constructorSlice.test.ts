import constructorSlice, {
  addIngredient,
  removeIngredient,
  moveIngredientUp
} from './constructorSlice';
import { describe, test, expect } from '@jest/globals';

describe('тестирование редьюсера constructorSlice', () => {
  const initialState = {
    loading: false,
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  const mockSauceIngredient = {
    id: 'id',
    _id: '643d69a5c3f7b9001cfa0944',
    name: 'Соус традиционный галактический',
    type: 'sauce',
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
  };

  const mockBunIngredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  describe('addIngredient', () => {
    test('добавление ингредиента в массив ingredients', () => {
      const newState = constructorSlice(
        initialState,
        addIngredient(mockSauceIngredient)
      );
      expect(newState.constructorItems.ingredients).toHaveLength(1);
    });

    test('добавление булки в пустое поле и замена булки', () => {
      const newState = constructorSlice(
        initialState,
        addIngredient(mockBunIngredient)
      );

      expect(newState.constructorItems.bun).toMatchObject(mockBunIngredient);

      const newBun = { ...mockBunIngredient, name: 'Новая булка' };

      const updatedState = constructorSlice(newState, addIngredient(newBun));

      expect(updatedState.constructorItems.bun).toMatchObject(newBun);
    });
  });

  // Блок тестов, связанных с удалением ингредиентов.
  describe('removeIngredient', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            id: 'test-id',
            _id: '643d69a5c3f7b9001cfa0944',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-03-large.png'
          }
        ]
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    const expectedResult = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: []
      }
    };
    test('удаление ингредиента из конструктора по id', () => {
      const newState = constructorSlice(
        initialState,
        removeIngredient('test-id')
      );

      expect(expectedResult.constructorItems.ingredients).toEqual(
        newState.constructorItems.ingredients
      );
    });
  });

  describe('тестирование moveIngredientUp', () => {
    const initialState = {
      constructorItems: {
        bun: {
          id: 'test-bun-id',
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
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        ingredients: [
          {
            id: 'test-sauce-id-1',
            _id: '643d69a5c3f7b9001cfa0944',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-03-large.png'
          },
          {
            id: 'test-main-id-2',
            _id: '643d69a5c3f7b9001cfa0946',
            name: 'Хрустящие минеральные кольца',
            type: 'main',
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
          },
          {
            id: 'test-sauce-id-3',
            _id: '643d69a5c3f7b9001cfa0942',
            name: 'Соус Spicy-X',
            type: 'sauce',
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-02-large.png'
          }
        ]
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    const expectedResult = {
      ...initialState,
      constructorItems: {
        bun: {
          id: 'test-bun-id',
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
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        ingredients: [
          {
            id: 'test-sauce-id-1',
            _id: '643d69a5c3f7b9001cfa0944',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-03-large.png'
          },
          {
            id: 'test-sauce-id-3',
            _id: '643d69a5c3f7b9001cfa0942',
            name: 'Соус Spicy-X',
            type: 'sauce',
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-02-large.png'
          },
          {
            id: 'test-main-id-2',
            _id: '643d69a5c3f7b9001cfa0946',
            name: 'Хрустящие минеральные кольца',
            type: 'main',
            proteins: 808,
            fat: 689,
            carbohydrates: 609,
            calories: 986,
            price: 300,
            image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
          }
        ]
      }
    };
    test('перемещение ингредиента на позицию выше', () => {
      const newState = constructorSlice(initialState, moveIngredientUp(2));
      const expected = expectedResult.constructorItems.ingredients;

      expect(expected).toEqual(newState.constructorItems.ingredients);
    });
  });
});
