# Animation Challenge

![Fireworks](https://s3.us-west-2.amazonaws.com/media.prism.ai/fireworks-scaled.jpg.webp)

_This repository is strictly confidential. Please do not share this prompt or code with anybody. All work must be your own._

Welcome to the Visual Electric Animation Challenge! Your task is to build a fireworks animation for the web.

## Challenge Rules

1. You must do this challenge yourself. You may not ask others for help (although you may use StackOverflow as you normally would).
2. You may use any resources you normally would on the job, including but not limited to: Google, StackOverflow, ChatGPT, Cursor, etc. Please attribute any functions provided by ChatGPT or copied from StackOverflow.
3. Your submission should contain production-ready code, complete with the appropriate file organization and types. You can include tests if you wish, but it's not a requirement.
4. You may use existing npm packages as you see fit, but do _not_ use any pre-built fireworks animation libraries (which would defeat the purpose of the challenge). You may of course look at those libraries for inspiration, but you must implement the animation yourself.
5. We don't want you to spend more than a day or so working on this. If you finish all the requirements, please do not feel pressured to build any of the "extra-credit" features. Those are _only_ for if you complete the core requirements and want to keep going.

## Implementation

Take a look at [this page](https://particles.js.org/samples/presets/fireworks.html) for a good example of what we're looking for. We're looking for a similar "fireworks" animation effect. There are no strict requirements around colors, trails, physics, or anything else. We just want to see an attractive animation. 

### Client

The client is a [React](https://reactjs.org) app served by [Next.js](https://nextjs.org). The code can be found in the [client directory](/client). We're currently using [Sass](https://sass-lang.com) modules, but feel free to use a CSS-in-JS framework of your choice if you prefer.


## Requirements

1. Everything must be written in [TypeScript](https://www.typescriptlang.org) and your styling language of choice. (Please do not use Vanilla JavaScript, yuck!)
2. You must submit a runnable site with a working animation. There should either be a continuous animation running, or a clear way to trigger the fireworks!
3. You must use either the canvas API or webGL. We recommend using [pixi.js](https://www.pixijs.com/), as it's what we use at Visual Electric!
4. You may _not_ use any pre-built fireworks animation libraries.
5. Please provide a short write-up of any design decisions you made and their reasoning by either A) replacing the contents of this file, `README.md`, or B) providing a new `IMPLEMENTATION.md` file.
6. Provide your finished submission as either a zip file or Github repo link to [jobs@visualelectric.com](mailto:jobs@visualelectric.com).

### Considarations

We've purposely left many of the design and implementation details open-ended. We're looking for engineers with strong instincts for good design and architecture. The implementation details, state management, and UX design choices are left entirely to you.

Don't worry too much about browser compatibility, just let us know what browsers you tested on. Similarly, don't worry about mobile support.

### Extra Credit

As mentioned above, we do not want you to spend more than a day or so on this project. If you finish the core implementation quickly, you might consider one or more of the following extra credit options.

1. Sandbox. It'd be pretty awesome to have a set of configurable physics parameters like gravity strength, air resistance, etc that would change the animation in real-time.  
2. Sound. Maybe you want to add some sound effects?
3. Browser/Mobile support. Not a requirement, but if you have extra time, go for it!
4. Any other ideas you have!

## Running the Project

This project uses the [yarn](https://yarnpkg.com/) package manager. If you don't have yarn, you can install it with `npm install -g yarn`.

Then, from the `client` directory:

`yarn dev`

should start the client at [http://localhost:3000](http://localhost:3000).

## Good Luck!
