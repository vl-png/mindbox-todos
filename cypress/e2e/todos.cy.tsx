
describe('Todos E2E', () => {
  const input = 'input[placeholder="What needs to be done?"]';

  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.window().then(w => w.localStorage.clear());
    cy.reload();
  });

  it('adds tasks', () => {
    cy.get(input).type('Hello world{enter}').type('Bye world{enter}').type('Hi world{enter}');
    cy.contains('li', 'Hello world').should('exist');
    cy.contains('li', 'Bye world').should('exist');
    cy.contains('li', 'Hi world').should('exist');
  });

  it('toggles task and filters Active', () => {
    cy.get(input).type('Hello world{enter}Hi world{enter}');
    cy.contains('li', 'Hi world').find('input[type="checkbox"]').click();
    cy.contains('button', 'Active').click();
    cy.contains('li', 'Hi world').should('not.exist');
    cy.contains('li', 'Hello world').should('exist');
  });

  it('edits task', () => {
    cy.get(input).type('Hello world{enter}');
    cy.contains('li', 'Hello world').find('label').dblclick();
    cy.focused().clear().type('Hello world 2025{enter}');
    cy.contains('li', 'Hello world 2025').should('exist');
  });

  it('clears completed tasks', () => {
    cy.get(input).type('Hello world{enter}Bye world{enter}');
    cy.contains('li', 'Hello world').find('input[type="checkbox"]').click();
    cy.contains('button', 'Clear completed').click();
    cy.contains('li', 'Hello world').should('not.exist');
    cy.contains('li', 'Bye world').should('exist');
  });

  it('deletes task', () => {
    cy.get(input).type('Hello world{enter}');
    cy.contains('li', 'Hello world').find('button[aria-label="remove"]').click({ force: true });
    cy.contains('li', 'Hello world').should('not.exist');
  });

  it('persists after reload', () => {
    cy.get(input).type('Hello world{enter}');
    cy.reload();
    cy.contains('li', 'Hello world').should('exist');
  });
});