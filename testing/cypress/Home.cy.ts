
describe('Home Page', () => {


    beforeEach(() => {
        cy.fixture('courses.json').as('coursesJSON');
        // Use the loaded data
        cy.get('@coursesJSON').then((courses) => {
            console.log(courses);
            // Assuming you want to mock a network response
            cy.intercept('/api/courses', courses).as('courses');
        });

        cy.visit('/');
        cy.contains('All Courses');
    });

    it('should display a list of courses', () => {



        // Wait for the courses API request to finish
        cy.wait('@courses');

        cy.get('mat-card').should('have.length', 9);

    });

    it('should display a list of courses', () => {

        // Wait for the courses API request to finish
        cy.wait('@courses');

        cy.get('.mdc-tab').should('have.length', 2);
        cy.get('.mdc-tab').last().click();

        cy.get('mat-card').should('have.length', 3);

        cy.get('.mat-mdc-card-title').first().should('contain', 'Angular Security Course');

    });


});