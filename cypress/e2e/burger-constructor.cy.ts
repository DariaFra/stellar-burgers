import { SELECTORS } from 'cypress/support/selectors';
import '../support/commands';

describe('Burger Constructor Page', () => {
  beforeEach(() => {
    // перехватывание запроса
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    // Установка куки и токена
    cy.setCookie(
      'accessToken',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGI3MDUzZTM2N2RlMDAxZGFmNWQyMSIsImlhdCI6MTczNDU0OTQzOSwiZXhwIjoxNzM0NTUwNjM5fQ.nq--rHrGPFYPgCSc9Nxb00jKAdqFvHCAyJUKezbDAbo'
    );
    localStorage.setItem('refreshToken', 'mockRefreshToken');
    cy.wrap(localStorage.getItem('refreshToken')).should(
      'eq',
      'mockRefreshToken'
    );
    // открываем страницу
    cy.visit('/');
    cy.wait('@getIngredients');

    //алиасы
    cy.get(SELECTORS.ingredientItem).as('ingredient');
    cy.get(SELECTORS.mainIngredient).as('mainIngredient');
  });

  it('ингредиенты отображаются на странице', () => {
    cy.get('@ingredient').should('have.length', 15);
  });

  it('проверка авторизации пользователя', () => {
    cy.visit('/profile');
    cy.get(SELECTORS.authUserName).should('have.value', 'Иван Иванов');
    cy.get(SELECTORS.authUserEmail).should(
      'have.value',
      'ivan.ivanov@example.com'
    );
  });

  it('Открытие модального окна, закрытие кликом на "Х", по клинку на overlay и нажатием клавиши Escape', () => {
    cy.openIngredientModal('Филе Люминесцентного тетраодонтимформа');
    cy.closeModal();

    cy.openIngredientModal('Сыр с астероидной плесенью');
    cy.get(SELECTORS.modalOverlay).click({ force: true });
    cy.get(SELECTORS.modal).should('not.exist');

    cy.openIngredientModal('Соус с шипами Антарианского плоскоходца');
    cy.get('body').type('{esc}');
    cy.get(SELECTORS.modal).should('not.exist');
  });

  it('Сборка бургера и оформиление заказа', () => {
    // Проверка, что пользователь авторизирован
    cy.get(SELECTORS.profileName).should('contain', 'Иван Иванов');

    // Довабление ингридиетнов
    cy.addIngredient('Краторная булка N-200i');
    cy.addIngredient('Мясо бессмертных моллюсков Protostomia');
    cy.addIngredient('Соус Spicy-X');

    // Проверка, что ингредиенты добавлены в конструктор
    cy.verifyIngredient(SELECTORS.topBun, 'Краторная булка N-200i');
    cy.verifyIngredient(SELECTORS.bottomBun, 'Краторная булка N-200i');
    cy.verifyIngredient(
      '@mainIngredient',
      'Мясо бессмертных моллюсков Protostomia'
    );
    cy.verifyIngredient('@mainIngredient', 'Соус Spicy-X');

    // Нажатие на кнопку "Оформить заказ"
    cy.get(SELECTORS.orderButton).click({ force: true });

    // Модальное окно появилось
    cy.get(SELECTORS.modal).should('exist').and('be.visible');

    //Проверка номера заказа
    cy.get(SELECTORS.orderNumber).should('contain', '12345');

    // Закрытие модального окна
    cy.closeModal();

    // Проверка, что ингредиенты удалены из конструктора
    cy.get(SELECTORS.topBun).should('not.exist');
    cy.get(SELECTORS.bottomBun).should('not.exist');
    cy.get('@mainIngredient')
      .children(SELECTORS.ingredientItem)
      .should('have.length', 0);
  });
});
