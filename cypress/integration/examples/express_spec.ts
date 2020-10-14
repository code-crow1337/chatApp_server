describe('Loading express', () => {
  const socket = io();
  beforeEach(() => {
    it('Succesfully loads', () => {
      cy.visit('/');
    });
  });
  it('Get back 200 from express server', () => {
    cy.request('/').then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
