describe('core-ui', () => {
  beforeEach(() => cy.visit('/iframe.html?id=democomponent--primary'));
  it('should render the component', () => {
    cy.get('mui-demo').should('exist');
  });
});