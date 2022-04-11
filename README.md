# React Google Calendar

I built this project to further explore the React library. This project is a responsive and accessible calendar application that displays any number of public Google calendars. The calendars are defined in the configuration file via dist/config/config.json.

I developed the application with HTML, CSS, JavaScript (ES6) and the React library. I used webpack with various loaders to transpile all of my code. I decided not to use Redux for managing the application state. Instead, I chose to use React's native Context API with the useContext hook to minimize dependencies. I wrote action creators and reducers along with some custom middleware for managing the application state. Finally, I used Cypress for testing the application. I wrote tests to test some of the initial load elements, sidebar interactions and toolbar interactions like the back and next controls.
