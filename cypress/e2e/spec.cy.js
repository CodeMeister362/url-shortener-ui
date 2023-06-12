describe('user flows', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statuscode: 200,
      fixture: 'mockData.json'
    })
    cy.visit('http://localhost:3000/')
  })

  it.skip('When a user visits the page, they can view the page title and the existing shortened URLs', () => {
    cy.get('header > h1').contains('URL Shortener')
    cy.get('.url').first().contains('h3', 'Awesome photo')
    cy.get('.url').last().contains('h3', 'ghgh')
  })

  it.skip('When a user visits the page, they can view the Form with the proper inputs', () => {
    cy.get('input').first().should('have.attr', 'name')
    cy.get('[placeholder="URL to Shorten..."]').should('have.attr', 'name')
  })

  it.skip('When a user fills out the form, the information is reflected in the input fields', () => {
    cy.get('input').first().type('hello')
    cy.get('input').last().type('world')
  })

  it('When a user fills out and submits the form, the new shortened URL is rendered', () => {
    cy.get('input').first().type('hello')
    cy.get('input').last().type('world')
    cy.get('button').click()
    cy.get('div').last().contains('h3', 'hello')
    cy.get('div').last().contains('p', 'world')
  })
})