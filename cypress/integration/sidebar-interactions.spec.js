/// <reference types="cypress" />

describe('Sidebar calendar interactions', () => {
    before(() => {
        cy.visit('http://localhost:3000');
        sessionStorage.clear();
    });

    it('Check sidebar calendar checked and unchecked states', () => {
        cy.get('#google-calendar__calendar-item-0').as('firstCalendarItem');

        cy.readFile('./dist/config/config.json').then(config => {
            // MAKE CYPRESS WAIT UNTIL CALENDAR DATA IS LOADED
            cy.window()
                .its('sessionStorage')
                .invoke('getItem', 'google-calendar-events')
                .should('exist'); 

            if(config.calendars[0].showInitially) {
                cy.get('@firstCalendarItem').uncheck();
                cy.get('@firstCalendarItem').should('not.be.checked');
                cy.get('@firstCalendarItem').invoke('attr', 'data-calendar-id').then(id => {
                    const calendarState = JSON.parse(sessionStorage.getItem('google-calendar-events'));
                    expect(calendarState[id].active).to.be.false;
                });

                cy.get('@firstCalendarItem').check();
                cy.get('@firstCalendarItem').should('be.checked');
                cy.get('@firstCalendarItem').invoke('attr', 'data-calendar-id').then(id => {
                    const calendarState = JSON.parse(sessionStorage.getItem('google-calendar-events'));
                    expect(calendarState[id].active).to.be.true;
                });
            } else {
                cy.get('@firstCalendarItem').check();
                cy.get('@firstCalendarItem').should('be.checked');
                cy.get('@firstCalendarItem').invoke('attr', 'data-calendar-id').then(id => {
                    const calendarState = JSON.parse(sessionStorage.getItem('google-calendar-events'));
                    expect(calendarState[id].active).to.be.true;
                });

                cy.get('@firstCalendarItem').uncheck();
                cy.get('@firstCalendarItem').should('not.be.checked');
                cy.get('@firstCalendarItem').invoke('attr', 'data-calendar-id').then(id => {
                    const calendarState = JSON.parse(sessionStorage.getItem('google-calendar-events'));
                    expect(calendarState[id].active).to.be.false;
                });
            }
        });
    });
});