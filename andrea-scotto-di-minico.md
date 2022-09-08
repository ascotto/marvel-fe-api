# Project Comments

## The Good
- Followed the up to date React best practices for 70-80% of the codebase
- Components code should be easy to understand, if not please tell me what code sections are hard to follow with
- Added a loading spinner when infinite scrolling
- Added a loading spinner on the first fetch
- Added Vercel for deployment
- Code structure for 3 separate environments (local, development, production)
- Implemented responsive design
- Applications is working on Vercel: https://marvel-api-six-sigma.vercel.app/
- There should be no errors in the console or visual bug


## The Bad
- The private key is exposed in the codebase, which is not a good practice (I did it for the sake of the test)
- The App.js file is too big, and could be split into smaller components (ex: a reducer for fetching data)
- Instead of TypeScript I used PropTypes, a good idea would be to branch out and use TypeScript
- Some comics do not have any price, for the test I showed N/A, in a real world scenario I would ask what to do in this case or ask to the backend team to fix it
- No test coverage

## The Ugly
- The fetch request do not handle errors, and the error handling is not implemented, so if the API fails the app will show the spinner forever with no error message, in a real worl scenario there would be an error handling functionality for the fetch request
- If you find more quirks please let me know

## Challenges
The hardest thing to do was ship something as quick as possible, beside I needed some extra time to learn how to implement the infinite scrolling.