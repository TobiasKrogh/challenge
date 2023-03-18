export const getHeader = () => cy.get('challenge-header');
export const generateButton = () => cy.get('reports-filters [type="submit"]');
export const noReportMessage = () => cy.get('reports-main .message-no-report');
export const reportOutput = () => cy.get('reports-output');

export const reportTableFirst = () =>
  reportOutput().find('table tbody tr:first-child');
