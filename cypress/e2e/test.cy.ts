describe('Проверяем доступность приложения', function () {
  beforeEach(() => {
    cy.setCookie('accessToken', 'mockAccessToken');
    localStorage.setItem('refreshToken', 'mockRefreshToken');

    cy.fixture('ingredients.json');

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('user');
    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json',
      delay: 100
    }).as('order');

    cy.visit('http://localhost:4000');
  });

  const addIngredient = (ingredientName: string | number | RegExp) => {
    cy.contains(ingredientName).parent().find('button').click();
  };

  it('Проверяем перехват запросов API', () => {
    cy.wait('@ingredients').its('response.statusCode').should('eq', 200);
    cy.wait('@user').its('response.statusCode').should('eq', 200);
  });

  describe('Проверяем работу конструктора', function () {
    it('Проверяем добавление булки', () => {
      addIngredient('Краторная булка N-200i');
    });

    it('Проверяем добавление ингредиента', () => {
      addIngredient('Биокотлета из марсианской Магнолии');
    });

    it('Проверяем добавление соуса', () => {
      addIngredient('Соус Spicy-X');
    });
  });

  describe('Проверяем работу модальных окон', function () {
    beforeEach(() => {
      cy.contains('Биокотлета из марсианской Магнолии').parent().click();
    });

    it('Проверяем открытие модального окна ингредиента', () => {
      cy.get('#modals')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
    });

    it('Проверяем закрытие по клику на крестик', () => {
      cy.get('#modals').find('button').click();
      cy.get('#modals').should('not.contain.html');
    });

    it('Проверяем закрытие по клику на оверлей', () => {
      cy.get('#modals').parent().click('topRight');
      cy.get('#modals').should('not.contain.html');
    });
  });

  describe('Проверяем cоздание заказа', function () {
    it('Должен делать заказ', () => {
      addIngredient('Краторная булка N-200i');
      addIngredient('Биокотлета из марсианской Магнолии');
      addIngredient('Соус Spicy-X');

      cy.contains('Оформить заказ').click();
      cy.contains('Оформляем заказ...').should('exist');

      cy.wait('@order').then(() => {
        cy.get('#modals').contains('64006').should('exist');
        cy.get('#modals').parent().click('topRight');
        cy.get('#modals').should('not.contain.html');

        cy.contains('Выберите булки').should('exist');
        cy.contains('Выберите начинку').should('exist');

        cy.contains('Оформить заказ').parent().contains('0').should('exist');
      });
    });
  });
});
