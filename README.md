# ExPostFacto - Team Retrospectives.

A web app for team retrospectives.

## Tech Stack

### Backend

- NodeJS
- Express.js
- PostgreSQL (Massivejs as connector)

Running for testing: ``cd app; DEBUG=express:* node app.js``

### Frontend

- React
- Material-UI
- axios

Running test server: ``cd frontend; npm start``

## Basic Functionality

There will be a board with 2+ columns. You can add cards to each column. Users can then vote on the cards they want to discuss. There should be a view to see cards ordered by votes.

Should support Mutliple teams, with multiple boards, with multiple columns, with multiple cards.

No Auth is required right away, all actions can be annoymous.

## To Do:

- Add team and board creation pages and logic
- Add ability to define the columns on a board
- Add authentication
