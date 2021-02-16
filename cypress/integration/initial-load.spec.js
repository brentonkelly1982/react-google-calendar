/// <reference types="cypress" />

describe('Initial calendar states and values', () => {
    before(() => {
        cy.visit('http://localhost:3000');
        sessionStorage.clear();
        console.log(sessionStorage.getItem('google-calendar-events'))
    });

    it('Check for the correct current month and year in the calendar header', () => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = (new Date()).getMonth();
        const year = (new Date()).getFullYear();

        cy.get('.google-calendar__calendar-month-header')
            .invoke('text')
            .should('equal', months[month] + " " + year);
    });

    it('Check that the calendar starts on the correct week day', () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const month = (new Date()).getMonth();
        const year = (new Date()).getFullYear();
        const startDay = (new Date(year, month, 1)).getDay();

        cy.get('.google-calendar__day[data-date="1"]').should('have.attr', 'data-day', days[startDay]);
    });

    it('Check that the calendar ends on the correct week day', () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const month = (new Date()).getMonth();
        const year = (new Date()).getFullYear();
        const lastDate = (new Date(year, month + 1, 0)).getDate();
        const lastDay = (new Date(year, month + 1, 0)).getDay();

        cy.get('.google-calendar__day[data-date="' + lastDate + '"]').should('have.attr', 'data-day', days[lastDay]);
    });

    it('Check for the correct list of calendars in the sidebar based on values set in the configuration file', () => {
        cy.readFile('./dist/config/config.json').then(config => {
            cy.get('.google-calendar__calendar-list-item').each((element, index) => {
                cy.get(element)
                    .children('.google-calendar__calendar-name')
                    .invoke('text')
                    .should('equal', config.calendars[index].name)
            });
        });
    });

    it('Check for the correct initial active state for each calendar in the sidebar based on values set in the configuration file', () => {
        cy.readFile('./dist/config/config.json').then(config => {
            cy.get('.google-calendar__calendar-list-item').each((element, index) => {
                cy.get(element)
                    .children('.google-calendar__calendar-toggle').then(child => {
                        if(config.calendars[index].showInitially) {
                            cy.get(child).should('be.checked');
                        } else {
                            cy.get(child).should('not.be.checked');
                        }
                    });
            });
        });
    });

    it('Check for the correct color swatch value for each calendar in the sidebar based on values set in the configuration file', () => {
        cy.readFile('./dist/config/config.json').then(config => {
            cy.get('.google-calendar__calendar-list-item').each((element, index) => {
                cy.get(element)
                    .children('.google-calendar__calendar-color-swatch')
                        .should('have.css', 'background-color', hexToRGB(config.calendars[index].color))
            });
        });

        function hexToRGB(hexStr){
            var hex = parseInt(hexStr.substring(1), 16);
            var r = (hex & 0xff0000) >> 16;
            var g = (hex & 0x00ff00) >> 8;
            var b = hex & 0x0000ff;

            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
    });
});