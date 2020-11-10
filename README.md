# quizgen

- Thie is the Rest API for Quiz Generator for Missionary Church Bible Quizzing
- It can be found at `https://mc-quiz-gen.herokuapp.com/`

## /api/auth

These are the only routes that do not require a token. You must register and then login and use the token to go to any other route.

- **[POST]** to `/api/auth/register`: returns a message. Pass in the following credentials as the `body` of the request: `{ username: 'myusername', password: 'mypassword', firstname: 'myfirstname', lastname: 'mylastname', question: 'myquestion', answer: 'myanswer', email: 'myemail'}`
- **[POST]** to `/api/auth/login`: returns a message, a Json Web Token (JWT) that is good for 1 day, and the user's id. Pass in the following credentials as the `body` of the request: `{ username: 'myusername, password: 'mypassword' }`
- **[GET]** to `/api/auth/questions`: returns a list of questions based on the paramaters sent. Pass in the following data as the `body` of the request: `{ book: 1, chapter: 1, type: 'g' }`

## /api/users

These routes are for the manipulation of users in the database. You must pass a valid token in the headers of all these routes.

- **[GET]** to `/api/users`: returns an array of objects each containing a unique user's data.
- **[PUT]** to `/api/users/:id`: updates the user using the `id` passed as part of the URL. Send the user object with the updated information as the `body` of the request.
- **[DELETE]** to `/api/users/:id`: removes the user and returns a message with the deleted user's id.

## /api/questions

These routes are for access to published and unpublished questions.

- **[GET]** to `api/questions`: returns an array of objects each containing all the question data.
- **[GET]** to `api/questions/questions`: returns a list of questions based on the parameters sent. Pass in the following data as the `body` of the request: `{ book: 1, chapter: 1, series: 0, type: 'g' }`
- **[GET]** to `api/questions/questions/count`: returns the count of all the records in the database.
- **[DELETE]** to `api/questions/`: removes all questions from the database.
