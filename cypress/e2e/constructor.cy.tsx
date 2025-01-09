import Cypress from 'cypress';

const BASE_URL = 'https://norma.nomoreparties.space/api';
const STAFFING_ID = `[data-cy=${'643d69a5c3f7b9001cfa0949'}]`;
const BUN_ID = `[data-cy=${'643d69a5c3f7b9001cfa093c'}]`;
const BUN2_ID = `[data-cy=${'643d69a5c3f7b9001cfa093d'}]`;
const MODAL_OVERLAY = `[data-cy=${'overlay'}]`;
const ORDER_BUTTON = `[data-cy=${'order-button'}]`;
const CONSTRUCTOR_BURGER = `[data-cy=${'burger-constructor'}]`;

beforeEach(() => {
  cy.intercept('GET', `${BASE_URL}/ingredients`, {
    fixture: 'ingredients.json'
  });
  cy.intercept('POST', `${BASE_URL}/auth/login`, {
    fixture: 'user.json'
  });
  cy.intercept('GET', `${BASE_URL}/auth/user`, {
    fixture: 'user.json'
  });
  cy.intercept('POST', `${BASE_URL}/orders`, {
    fixture: 'orderResponse.json'
  });
  cy.visit('http://localhost:4000/');
  cy.viewport(1920, 1080);
  cy.get('#modals').as('modal');
});

describe('добавление ингредиента в список заказа', () => {
  it('инкремент счетчика ингредиента', () => {
    cy.get(STAFFING_ID).find('.counter__num').should('not.exist');
    cy.get(STAFFING_ID).children('button').click();
    cy.get(STAFFING_ID).find('.counter__num').contains('1');
  });
  describe('добавление булок и начинок', () => {
    it('добавление булки и начинки в список заказа', () => {
      cy.get(CONSTRUCTOR_BURGER)
        .find('.constructor-element')
        .should('not.exist');
      cy.get(BUN_ID).children('button').click();
      cy.get(STAFFING_ID).children('button').click();
      cy.get(CONSTRUCTOR_BURGER)
        .find('.constructor-element')
        .should('have.length', 3);
    });
    it('замена булки другой булкой при полном списке начинок ', () => {
      cy.get(CONSTRUCTOR_BURGER)
        .find('.constructor-element')
        .should('not.exist');
      cy.get(BUN_ID).children('button').click();
      cy.get(STAFFING_ID).children('button').click();
      cy.get(CONSTRUCTOR_BURGER)
        .find('.constructor-element')
        .should('have.length', 3);
      cy.get(BUN2_ID).children('button').click();
      cy.get(CONSTRUCTOR_BURGER)
        .find('.constructor-element')
        .should('have.length', 3);
    });
  });
});

describe('модельные окна', () => {
  it('открытие и проверка отображения данных модального окна ингредиента', () => {
    cy.get('@modal').should('be.empty');
    cy.get(STAFFING_ID).children('a').click();
    cy.get('@modal').should('be.not.empty');
    cy.get('@modal').should('contain.text', 'Мини-салат Экзо-Плантаго');
  });
  it('закрытие модального окна ингредиента по клику на кнопку крестик', () => {
    cy.get('@modal').should('be.empty');
    cy.get(STAFFING_ID).children('a').click();
    cy.get('@modal').should('be.not.empty');
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('be.empty');
  });
  it('закрытие модального окна ингредиента по клику на оверлей', () => {
    cy.get('@modal').should('be.empty');
    cy.get(STAFFING_ID).children('a').click();
    cy.get('@modal').should('be.not.empty');
    cy.get(MODAL_OVERLAY).invoke('css', 'position', 'absolute').click(1000, 20);
    cy.get('@modal').should('be.empty');
  });
});

describe('оформление заказа', () => {
  beforeEach(() => {
    window.localStorage.setItem('refreshToken', 'refresh-token');
    cy.setCookie('accessToken', 'access-token');
    cy.getAllLocalStorage().should('be.not.empty');
    cy.getCookie('accessToken').should('be.not.empty');
  });
  afterEach(() => {
    window.localStorage.clear();
    cy.clearAllCookies();
    cy.getAllLocalStorage().should('be.empty');
    cy.getAllCookies().should('be.empty');
  });

  it('отправка заказа c проверкой корректного ответа', () => {
    cy.get(CONSTRUCTOR_BURGER).find('.constructor-element').should('not.exist');
    cy.get(BUN_ID).children('button').click();
    cy.get(STAFFING_ID).children('button').click();
    cy.get(ORDER_BUTTON).click();
    cy.get('@modal').find('h2').contains('64961');
    cy.get(MODAL_OVERLAY).invoke('css', 'position', 'absolute').click(1000, 20);
    cy.get('@modal').should('be.empty');
    cy.get(CONSTRUCTOR_BURGER)
      .find('.constructor-element')
      .should('have.length', 0);
  });
});
