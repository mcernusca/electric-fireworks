# Electric Fireworks

Preview: https://electric-fireworks.netlify.app

## New Dependencies
- Used [pixi.js](https://www.pixijs.com/) and [react-pixi](https://github.com/inlet/react-pixi) for the fireworks animation. Due to the nature of the animation, it wasn't necessary to use the react wrapper, but I wanted to get some practice using it.
- Used [pixi/filter-advanced-bloom](https://github.com/pixijs/filters/tree/master/packages/filter-advanced-bloom) for a subtle bloom effect.
- Used [react-spring](https://www.react-spring.dev/) for the interactive joystick animation.
- Used [use-gesture](https://github.com/pmndrs/use-gesture) for the joystick gesture handling.

Tested against Chrome 131.

### Design Decisions

- Pixi doesn't implement a normalized units system (like Three.js or other graphics libraries I've used), so I created a custom hook to handle the conversion between normalized and screen coordinates. I went with a normalized Y-up 2x2 unit screen space where 0,0 is the center of the screen. For the purposes of this demo this felt sufficient. See `lib/use-normalized-units.ts` for details.
- The fireworks animation is implemented as a Pixi ticker that runs on every frame. I draw the particles directly to the Pixi graphics context and not leveraging the `react-pixi` renderer. The rendering code is extracted to `lib/particle-renderer.ts` for separation of concerns and make future particle logic testing easier (although no tests are provided).
- The `Firework` class represents a single fired firework and is responsible for managing the various particles lifecycle. Particles are implemented as a class hierarchy of `BaseParticle` and subclasses `ShellParticle` and `SparkParticle`. See `lib/firework.ts` and `lib/particle.ts` for details.
- I used a simple 2D vector abstraction inspired by `p5.js` for convenience. See `lib/vector2.ts` for details.
- An interactive joystick is used to control launching the fireworks giving control over initial magnitude and angle. See `components/joystick.tsx` for details. This also controls the angle and size of the final explosion.

## Running the Project

This project uses the [yarn](https://yarnpkg.com/) package manager. If you don't have yarn, you can install it with `npm install -g yarn`.

Then, from the `client` directory:

`yarn dev`

should start the client at [http://localhost:3000](http://localhost:3000).