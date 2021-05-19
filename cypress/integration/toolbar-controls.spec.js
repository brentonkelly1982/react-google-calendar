/// <reference types="cypress" />

describe('Calendar back control', () => {
    before(() => {
        cy.visit('http://localhost:8000');
    });

    it('Check that clicking the back button changes the calendar correctly to the previous month', () => {
        cy.get('.google-calendar__navigation-control.google-calendar--back').trigger('click');

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = (new Date((new Date()).setMonth((new Date()).getMonth() - 1))).getMonth();
        const year = (new Date((new Date()).setMonth((new Date()).getMonth() - 1))).getFullYear(); 

        cy.get('.google-calendar__calendar-month-header')
            .invoke('text') 
            .should('equal', months[month] + " " + year);
    });

    it('Check that the previous calendar starts on the correct week day', () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const month = (new Date((new Date()).setMonth((new Date()).getMonth() - 1))).getMonth();
        const year = (new Date((new Date()).setMonth((new Date()).getMonth() - 1))).getFullYear(); 
        const startDay = (new Date(year, month, 1)).getDay();

        cy.get('.google-calendar__day[data-date="1"]').should('have.attr', 'data-day', days[startDay]);
    });

    it('Check that the previous calendar ends on the correct week day', () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const month = (new Date((new Date()).setMonth((new Date()).getMonth() - 1))).getMonth();
        const year = (new Date((new Date()).setMonth((new Date()).getMonth() - 1))).getFullYear(); 
        const lastDate = (new Date(year, month + 1, 0)).getDate();
        const lastDay = (new Date(year, month + 1, 0)).getDay();

        cy.get('.google-calendar__day[data-date="' + lastDate + '"]').should('have.attr', 'data-day', days[lastDay]); 
    });

    it('Check that clicking the back button a second time changes the calendar correctly to the month before last', () => {
        cy.get('.google-calendar__navigation-control.google-calendar--back').trigger('click');

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = (new Date((new Date()).setMonth((new Date()).getMonth() - 2))).getMonth();
        const year = (new Date((new Date()).setMonth((new Date()).getMonth() - 2))).getFullYear();

        cy.get('.google-calendar__calendar-month-header')
            .invoke('text') 
            .should('equal', months[month] + " " + year);
    });

    it('Check that the month before last starts on the correct week day', () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const month = (new Date((new Date()).setMonth((new Date()).getMonth() - 2))).getMonth();
        const year = (new Date((new Date()).setMonth((new Date()).getMonth() - 2))).getFullYear(); 
        const startDay = (new Date(year, month, 1)).getDay();

        cy.get('.google-calendar__day[data-date="1"]').should('have.attr', 'data-day', days[startDay]);
    });

    it('Check that the month before last ends on the correct week day', () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const month = (new Date((new Date()).setMonth((new Date()).getMonth() - 2))).getMonth();
        const year = (new Date((new Date()).setMonth((new Date()).getMonth() - 2))).getFullYear(); 
        const lastDate = (new Date(year, month + 1, 0)).getDate();
        const lastDay = (new Date(year, month + 1, 0)).getDay();

        cy.get('.google-calendar__day[data-date="' + lastDate + '"]').should('have.attr', 'data-day', days[lastDay]); 
    });
});

describe('Calendar next control', () => {
    before(() => {
        cy.visit('http://localhost:8000');
    });

    it('Check that clicking the next button changes the calendar correctly to the next month', () => {
        cy.get('.google-calendar__navigation-control.google-calendar--next').trigger('click');

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = (new Date((new Date()).setMonth((new Date()).getMonth() + 1))).getMonth();
        const year = (new Date((new Date()).setMonth((new Date()).getMonth() + 1))).getFullYear();

        cy.get('.google-calendar__calendar-month-header')
            .invoke('text') 
            .should('equal', months[month] + " " + year);
    });

    it('Check that the next calendar starts on the correct week day', () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const month = (new Date((new Date()).setMonth((new Date()).getMonth() + 1))).getMonth();
        const year = (new Date((new Date()).setMonth((new Date()).getMonth() + 1))).getFullYear(); 
        const startDay = (new Date(year, month, 1)).getDay();

        cy.get('.google-calendar__day[data-date="1"]').should('have.attr', 'data-day', days[startDay]);
    });

    it('Check that the next calendar ends on the correct week day', () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const month = (new Date((new Date()).setMonth((new Date()).getMonth() + 1))).getMonth();
        const year = (new Date((new Date()).setMonth((new Date()).getMonth() + 1))).getFullYear(); 
        const lastDate = (new Date(year, month + 1, 0)).getDate();
        const lastDay = (new Date(year, month + 1, 0)).getDay();

        cy.get('.google-calendar__day[data-date="' + lastDate + '"]').should('have.attr', 'data-day', days[lastDay]); 
    });

    it('Check that clicking the next button again changes the calendar correctly to the month after next', () => {
        cy.get('.google-calendar__navigation-control.google-calendar--next').trigger('click');

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = (new Date((new Date()).setMonth((new Date()).getMonth() + 2))).getMonth();
        const year = (new Date((new Date()).setMonth((new Date()).getMonth() + 2))).getFullYear(); 

        cy.get('.google-calendar__calendar-month-header')
            .invoke('text') 
            .should('equal', months[month] + " " + year);
    });

    it('Check that the month after next starts on the correct week day', () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const month = (new Date((new Date()).setMonth((new Date()).getMonth() + 2))).getMonth();
        const year = (new Date((new Date()).setMonth((new Date()).getMonth() + 2))).getFullYear(); 
        const startDay = (new Date(year, month, 1)).getDay();

        cy.get('.google-calendar__day[data-date="1"]').should('have.attr', 'data-day', days[startDay]);
    });

    it('Check that the month after next ends on the correct week day', () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const month = (new Date((new Date()).setMonth((new Date()).getMonth() + 2))).getMonth();
        const year = (new Date((new Date()).setMonth((new Date()).getMonth() + 2))).getFullYear(); 
        const lastDate = (new Date(year, month + 1, 0)).getDate();
        const lastDay = (new Date(year, month + 1, 0)).getDay();

        cy.get('.google-calendar__day[data-date="' + lastDate + '"]').should('have.attr', 'data-day', days[lastDay]); 
    });
});

describe('Calendar today control', () => {
    before(() => {
        cy.visit('http://localhost:8000');
    });

    it('Check that clicking the today button changes the calendar correctly to the current month', () => {
        cy.get('.google-calendar__navigation-control.google-calendar--today').trigger('click');

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = (new Date()).getMonth();
        const year = (new Date()).getFullYear(); 

        cy.get('.google-calendar__calendar-month-header')
            .invoke('text') 
            .should('equal', months[month] + " " + year);
    });

    it('Check that the previous calendar starts on the correct week day', () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const month = (new Date()).getMonth();
        const year = (new Date()).getFullYear(); 
        const startDay = (new Date(year, month, 1)).getDay();

        cy.get('.google-calendar__day[data-date="1"]').should('have.attr', 'data-day', days[startDay]);
    });

    it('Check that the previous calendar ends on the correct week day', () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const month = (new Date()).getMonth();
        const year = (new Date()).getFullYear(); 
        const lastDate = (new Date(year, month + 1, 0)).getDate();
        const lastDay = (new Date(year, month + 1, 0)).getDay();

        cy.get('.google-calendar__day[data-date="' + lastDate + '"]').should('have.attr', 'data-day', days[lastDay]); 
    });
});