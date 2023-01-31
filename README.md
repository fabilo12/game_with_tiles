# Game with tiles

This is an implementation of a [known board game](https://en.wikipedia.org/wiki/Azul_(board_game)). It was made as an exercise in order to get practice in JavaScript, React and aspects of front-end development. 

## Playing the game

The game is hosted via [GitHub Pages](https://pages.github.com/) under [this Link](https://fabilo12.github.io/game_with_tiles/).

## Todos

* Network mode
  * So far, it is not possible to play on network. That means all players have to play from the same device within the same browser. Adding a network mode could follow the explanations and code from this [chat app example implementation](https://dev.to/novu/building-a-chat-app-with-socketio-and-react-2edj).
* Testing
  * The code was created without testing in mind. Therefore, some functions (e.g. addFinalScore within finishRound.js) should be put into a separate file to be accessible for testing.
* Look and handling, especially on mobile devices.
* Migrate to TypeScript
* An additional play mode where the color pattern on the wall is not predefined.

## About implementation

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Global state management is done via the Context API as explained in [this blog post](https://codeburst.io/global-state-with-react-hooks-and-context-api-87019cc4f2cf). For the deployment, I followed [these instructions](https://github.com/gitname/react-gh-pages).

