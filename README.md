## FightCamp take home challenge (Backend) 🥊

Hey! Congratulations on making it to the next step in the interview process. We look forward to having you potentially join the FightCamp family!

## Objective

The purpose of this assignment is to assess your ability to give an effective code review/analysis for a small project. We would like you to identify areas in the code that need fixes or potential improvements.

### About The Project

The given code is a part of a simple blog/post management system that uses TypeScript, Node.js,  and GraphQL. The system allows users to create, read, update, and delete blog posts, as well as associate authors with their posts.

The project can be run by ensuring NodeJs is installed, MongoDB is installed and running (using [Homebrew](https://brew.sh/ "Homebrew")), installing dependencies, then starting the application:

Download MongoDB:
- `brew tap mongodb/brew`

Install MongoDB:
- `brew install mongodb-community@6.0`

Run MongoDB:
- `brew services start mongodb-community@6.0`

Download this repo and run:
- `npm install`

Then start the application:
- `npm run start`

At this point, a GraphQL Playground should be available to you at: http://localhost:4000/.
- You can copy and paste relevant queries from `./graphql-operations`

** NOTE: ** You do not need to run the application to complete this challenge, but it's usefull to do so if you attempt to tackle the bonus section below.

## Instructions 

Identify areas in the code where fixes or improvements are needed. Focus on the following aspects:

- Code quality
- Test coverage
- Performance
- Scalability
- Security

Areas to pay special attention to:

- TypeScript best practices and typings
- Proper usage of Node.js and its libraries
- Implementation of GraphQL schema, resolvers, and queries
- Error handling and validation
- Test coverage and test cases
- Any potential security vulnerabilities
- Code organization and readability

Provide detailed explanations and suggestions for each issue you identify. Use code snippets where necessary to illustrate your points.

### Submitting Your Review

Submit your code review in a document (Google Doc, Word Doc, PDF, etc.) with the following structure:

- Introduction
- Identified issues (with explanations and suggestions)
- Conclusion

Please take your time to review the code thoroughly and provide comprehensive feedback. We are looking for someone who can not only identify issues but also suggest improvements that demonstrate a deep understanding of the technologies involved.

We appreciate the time and effort you put into this assignment and look forward to reviewing your submission. Good luck!

## Bonus

In addition to your documented review, we invite you to make some of your suggested changes to the code directly. We'de love to see your updates (even if partial) but it's not a requirement!

If you do decide to make code changes, just make sure the app still starts up without error; then zip it up and send it back to us with your written review.