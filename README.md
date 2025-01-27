# Wordle Challenge

![Wordle Screenshot](https://s3.us-west-2.amazonaws.com/media.prism.ai/wordle.png)

_This repository is strictly confidential. Please do not share this prompt or code with anybody. All work must be your own._

Welcome to the Wordle Challenge! Your task is to build a fully-functional game of [Wordle](https://www.nytimes.com/games/wordle/index.html).

## Challenge Rules

1. You must do this challenge yourself. You may not ask others for help (although you may use StackOverflow as you normally would).
2. You may use any resources you normally would on the job, including but not limited to: Google, StackOverflow, ChatGPT, etc. Please attribute any functions provided by ChatGPT or copied from StackOverflow.
3. Your submission should contain production-ready code, complete with the appropriate file organization and types. You can include tests if you wish, but it's not a requirement.
4. You may use any existing npm packages you wish.
5. We don't want you to spend more than a day or so working on this. If you finish all the requirements, please do not feel pressured to build any of the "extra-credit" features. Those are _only_ for if you complete the core requirements and want to keep going.

## Wordle Rules

[Wordle](https://www.nytimes.com/games/wordle/index.html) is a word game played on a 5x6 "grid". The game begins by secretly selecting a random 5-letter word from the [dictionary of words](server/src/words). The player then submits a guess by typing in a 5-letter word and hitting enter. If the user's entry is not in the dictionary, they should be alerted, and the guess should be rejected. If it is a valid word, it should be displayed on the top row of the grid, with each box of the top row containing one letter of the user's guess. Each letter should be color-coded with one of three colors indicating: 1) a letter not in the word, 2) a letter in the word, but not in the correct position, or 3) a correct letter in the correct position. The New York Times implementation uses gray, yellow, and green, respectively.

The same process is then repeated, with each guess occupying another row of the grid, until either A) the correct word is guessed by the player, indicating a win or B) the player makes 6 incorrect guesses, indicating a loss.

We _highly recommend_ spending a bit of time with the official [New York Times implementation of Wordle](https://www.nytimes.com/games/wordle/index.html) to get a feel for the game.

## Tech Stack

There are two components to the tech stack you must use. The tech stack is non-negotiable, and is the same stack we use at Prism! We want the experience working on this project to be as close as possible to the experience of working on the Prism app.

### Client

The client is a [React](https://reactjs.org) app served by [Next.js](https://nextjs.org). The code can be found in the [client directory](/client). We're currently using [Sass](https://sass-lang.com) modules, but feel free to use a CSS-in-JS framework of your choice if you prefer.

### Server

The server is an [express](https://expressjs.com) app exposing a [GraphQL](https://graphql.org) api via [Apollo](https://www.apollographql.com). The code can be found in the [server directory](/server). Once again, this is the same stack we're using at Prism.

## Requirements

1. Everything must be written in [TypeScript](https://www.typescriptlang.org) and your styling language of choice. (Please do not use Vanilla JavaScript, yuck!)
2. You must submit a playable game of Wordle. It should be fun and satsifying!
3. Your game should be playable on both Desktop and Mobile devices.
4. You should use the [word dictionary](server/src/words) provided in the [server/src](server/src) directory.
5. Your implementation should, unlike the NYT implemenation, include a way to start a new game (even if it's just a refresh).
6. You may _not_ move the word list into the client directory.
7. The server should be stateless (i.e. not reliant on sessions).
8. Please provide a short write-up of any design decisions you made and their reasoning by either A) replacing the contents of this file, `README.md`, or B) providing a new `WORDLE.md` file.
9. Provide your finished submission as either a zip file or Github repo link to [jobs@prism.ai](mailto:jobs@prism.ai).

### Considarations

We've purposely left many of the design and implementation details open-ended. We're looking for engineers with strong instincts for good design and architecture. The API schemas, state management, and UX design choices are left entirely to you.

For example, the NYT implementation includes an on-screen QWERTY keyboard. This is not a requirement, but think carefully about how it helps players during the game. For instance, the color-coding on the keyboard provides a very convenient way to see which letters have _not_ been guessed. How should text entry work on mobile?

Providing a pixel-for-pixel match to the original game would be an excellent submission. But please feel free to take some creative license - make it your own! Use your favorite colors, animation libraries, etc. Give it some zest, maybe some fireworks or sound effects! If you can think of a better way to represent the game visually, go for it.

### Extra Credit

As mentioned above, we do not want you to spend more than a day or so on this project. If you finish the core implementation quickly, you might consider one or more of the following extra credit options.

1. Tests. We've included [jest](https://jestjs.io/) as a dev dependency.
2. Databases. We gave you the word dictionary as a file, but you might consider storing them in a database. We use [PostgreSQL](https://www.postgresql.org/).
3. History. The NYT version keeps track of wins and losses and how many guesses you took. You might store those in a database as well.
4. Hard Mode. The NYT version provides a "hard mode". In hard mode, a player _must_ guess words using the hints they've uncovered.

## Running the Project

This project uses the [yarn](https://yarnpkg.com/) package manager. If you don't have yarn, you can install it with `npm install -g yarn`.

Then, from the `client` directory:

`yarn dev`

should start the client at [http://localhost:3000](http://localhost:3000).

And from the `server` directory:

`yarn dev`

should start the server at [http://localhost:8002](http://localhost:8002).

Once both are started, open the client in your browser to make sure the round-trip connection has been established.

## Good Luck!
