# ex-post-facto - A retrospective application 

A web app to provide a board for team retrospectives.

## Tech Stack

### Backend

- NodeJS 
- Express.js
- PostgreSQL (Massivejs as connector)

Running for testing: ``cd app; DEBUG=express:* node app.js``

### Frontend

- React
- React-bootstrap (may switch to Material-UI or React-Toolkit)
- axios

Running test server: ``cd frontend; npm start``

## Basic Functionality

There will be a board with 2+ columns. You can add cards to each column. Users can then vote on the cards they want to discuss. There should be a view to see cards ordered by votes.

Should support Mutliple teams, with multiple boards, with multiple columns, with multiple cards. 

No Auth is required right away, all actions can be annoymous. 

## To Do:

- Flesh out frontend skeleton
- Define Database scheme
- Write the entire backend
- Basically everything

