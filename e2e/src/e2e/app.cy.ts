import {
  generateButton,
  getHeader,
  noReportMessage,
  reportOutput,
  reportTableFirst,
} from '../support/app.po';

describe('test', () => {
  beforeEach(() => {
    cy.intercept('/mock-api/api/gateways', {
      fixture: 'gateways.json',
    }).as('Gateways');
    cy.intercept('/mock-api/api/projects', {
      fixture: 'projects.json',
    }).as('Projects');
    cy.intercept('/mock-api/api/users', {
      fixture: 'users.json',
    }).as('Users');

    cy.intercept('/mock-api/api/report', {
      fixture: 'report.json',
    }).as('Report');

    cy.viewport(1440, 900);
    cy.visit('/');
  });

  it('should behave properly', () => {
    // internal redirect
    cy.url().should('contain', '/reports');

    cy.wait(['@Gateways', '@Projects', '@Users']);

    // user data fetched and rendered
    getHeader().contains('John Doe');

    noReportMessage().should('exist');
    reportOutput().should('not.exist');

    // generate report
    generateButton().click();

    cy.wait(['@Report']);

    noReportMessage().should('not.exist');
    reportOutput().should('exist');

    reportTableFirst().contains('15/04/2021');
    reportTableFirst().contains('Gateway 2');
    reportTableFirst().contains('6149cf56ae3f9cd9380f33ed');
    reportTableFirst().contains('2,301.07 USD');

    reportOutput().contains('TOTAL: 123,787.35 USD');
  });
});
