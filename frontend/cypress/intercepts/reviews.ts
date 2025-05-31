export function mockReviewAvatar(photoUri: string) {
  cy.intercept(photoUri, { fixture: 'avatar.png' });
}
