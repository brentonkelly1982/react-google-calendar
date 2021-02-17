# React Google Calendar

I built this project to further explore the React library. This project is a responsive and accessible calendar application that displays any number of public Google calendars. The calendars are defined in the configuration file via dist/config/config.json.

I developed the application with HTML, CSS, JavaScript (ES6) and the React library. I used webpack with various loaders to transpile all of my code. I decided not to use Redux for managing the application state. Instead, I used React's new Context API with the useContext hook. I found this to be a much simpler implementation but I did hit a snag when I wanted to write thunks. It seems that that functionality isn't natively availble in React so I'd have to stick with Redux in the future. I instead wrote my logic within my components for this project. I was still able to write my action creators and reducers as normal for managing the application state. Finally, I used Cypress for testing the application. I wrote tests to test some of the initial load elements, sidebar interactions and toolbar interactions like the back and next controls.

