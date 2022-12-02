# Development

### Link to Deployed Website
If you used the stencil code, this is `https://<your GitHub username>.github.io/<name of your repository>`

### Goal and Value of the Application
The goal of the application is for users to be able to view and sort drinks at a cafe. They can also add drinks to a favorites list, view their favorites, and see the total price of their favorites. 


### Usability Principles Considered
By having different filters, I allow users to find the best drink for them. For example if a user has a dairy allergy they can find drinks for fit for them. I also allowed for them to go back and look at all the drinks after looking at a specific type of drink. 


### Organization of Components
I have one compenent which is used to display each drink item, and then an App.js which displays the entire page.


### How Data is Passed Down Through Components
The data is passed through components with the use of props. I pass the drink information from the json into each drink compenent. 

### How the User Triggers State Changes
The user triggers state changes in a couple of ways. The first is using any of the sort/filter buttons. This will change a variety of state variables that help control what items are displayed on the page. Another way to change the state variable is by clicking the reset sort and filter button, which will reset the drink types, sorting, and filters. The add to and remove from favorties buttons will also affect state.
