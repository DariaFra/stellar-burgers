
describe('Burger Constructor Page', () => {

    beforeEach(() => {

        // перехватывание запроса
        cy.intercept('GET', '/api/ingredients', {fixture: 'ingredients.json'}).as('getIngredients');
        cy.intercept('GET', '/api/auth/user', {fixture: 'user.json'}).as('getUser')
        cy.intercept('POST', '/api/orders', {fixture: 'order.json'}).as('createOrder');

        // Установка куки и токена  
        cy.setCookie('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGI3MDUzZTM2N2RlMDAxZGFmNWQyMSIsImlhdCI6MTczNDU0OTQzOSwiZXhwIjoxNzM0NTUwNjM5fQ.nq--rHrGPFYPgCSc9Nxb00jKAdqFvHCAyJUKezbDAbo');
        localStorage.setItem('refreshToken', 'mockRefreshToken');
        cy.wrap(localStorage.getItem('refreshToken')).should('eq', 'mockRefreshToken');

        // открываем страницу 
        cy.visit('http://localhost:4000');
        cy.wait('@getIngredients');
    })

    it('ингредиенты отображаются на странице', () => {
        cy.get('li').should('have.length', 15);
    })

    it('проверка авторизации пользователя', () => {
        cy.visit('http://localhost:4000/profile');
        cy.get(`input[name="name"]`).should('have.value', 'Иван Иванов');
        cy.get(`input[name="email"]`).should('have.value', 'ivan.ivanov@example.com');
    });

    it('Открытие модального окна, закрытие кликом на "Х", по клинку на overlay и нажатием клавиши Escape', () => {
        // Открытие модального окна
        cy.get('li').contains('Филе Люминесцентного тетраодонтимформа').click();
        cy.get('[data-testid="modal"]').should('exist');
        cy.get('[data-testid="modal"]').within(() => {
            cy.contains('Филе Люминесцентного тетраодонтимформа').should('be.visible');
          });
    
        // Закрытие кликом на "Х"
        cy.get('[data-testid="modal"] button').click();
        cy.get('[data-testid="modal"]').should('not.exist');
    
        // Открытие модального окна
        cy.get('li').contains('Сыр с астероидной плесенью').click();
        cy.get('[data-testid="modal"]').should('exist');
        cy.get('[data-testid="modal"]').within(() => {
            cy.contains('Сыр с астероидной плесенью').should('be.visible');
          });
    
        // Закрытие кликом на overlay
        cy.get('[data-testid="modal"]').should('be.visible');
        cy.get('[data-testid="modal-overlay"]').click({ force: true});
        cy.get('[data-testid="modal"]').should('not.exist');
    
        // Открытие модального окна
        cy.get('li').contains('Соус с шипами Антарианского плоскоходца').click();
        cy.get('[data-testid="modal"]').should('exist');
        cy.get('[data-testid="modal"]').within(() => {
            cy.contains('Соус с шипами Антарианского плоскоходца').should('be.visible');
          });
    
        // Закрытие через клавишу Escape
        cy.get('body').type('{esc}');
        cy.get('[data-testid="modal"]').should('not.exist');
    })

    it('Сборка бургера и оформиление заказа', () => {

        // Проверка, что пользователь авторизирован
        cy.get('[data-testid="profile-name"]').should('contain', 'Иван Иванов');

        // Довабление ингридиетнов 
        cy.get('li:contains("Краторная булка N-200i") button:contains("Добавить")').click();
        cy.get('li:contains("Мясо бессмертных моллюсков Protostomia") button:contains("Добавить")').click();
        cy.get('li:contains("Соус Spicy-X") button:contains("Добавить")').click();

        // Проверка, что ингредиенты добавлены в конструктор
        cy.get('[data-testid="constructor-top-bun"]')
        .should('exist')
        .and('be.visible')
        .and('contain', 'Краторная булка N-200i');
        
        cy.get('[data-testid="constructor-bottom-bun"]')
          .should('exist')
          .and('be.visible')
          .and('contain', 'Краторная булка N-200i');
        
        cy.get('[data-testid="constructor-main"]')
          .should('exist')
          .and('be.visible')
          .and('contain', 'Мясо бессмертных моллюсков Protostomia')
          .and('contain', 'Соус Spicy-X');

        // Нажатие на кнопку "Оформить заказ"
        cy.get('button:contains("Оформить заказ")').click({ force: true});

        // Модальное окно появилось
        cy.get('[data-testid="modal"]').should('exist').and('be.visible');

        //Проверка номера заказа
        cy.get('[data-testid="order-number"]').should('contain', '12345');

        // Закрытие модального окна
        cy.get('[data-testid="modal"] button').click();
        cy.get('[data-testid="modal"]').should('not.exist');

        // Проверка, что ингредиенты удалены из конструктора
        cy.get('[data-testid="constructor-top-bun"]').should('not.exist');
        cy.get('[data-testid="constructor-bottom-bun"]').should('not.exist');
        cy.get('[data-testid="constructor-main"]').children('li').should('have.length', 0);
    });
})


  

