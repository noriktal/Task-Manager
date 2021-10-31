
## Running the Task Management Dashboard

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Several Comments and explanation of considerations

- State management is done with Redux. I strived to keep all the heavier computations to memoized selectors created with createSelector() of Reselect library.

- I knowingly left the logger middleWare attached to the store- this way it is easier to follow state changes in the console (I know it shouldn't be left in a production version).

- Styling resides mainly in css module files (in the Styles directory). Several general styles are in the index.js file. Conditional rendering styles are inside components.

- I did't use ready-made UI components of external libraries. 

-I am aware of the fact that my solution for the collapsing behavior of table rows is not ideal. Note to myself: learn better ways to traverse node trees.



