describe('проверяем доступность приложения', function () {
  beforeEach(() => {
    cy.setCookie('accessToken', 'mockAccessToken');
    localStorage.setItem('refreshToken', 'mockRefreshToken');

    cy.fixture('ingredients.json');

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.visit('http://localhost:4000');
  });

  it('Проверяем перехват запросов API', () => {
    cy.wait('@getIngredients').its('response.statusCode').should('eq', 200);
  });
});
