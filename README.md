# react-redux-express-template-empty

### Initialization

First, run the following commands to ensure that all global and local dependencies are installed (or run `sh init.sh` on MacOS).

`npm install -g browserify watchify uglify babelify typescript`

`npm install`

Next, install Sass from [here](https://sass-lang.com/install).

Your version of `node-sass` may need to be updated depeneding on what version of node you are running. You can find which version of `node-sass` to use for your node [here](https://www.npmjs.com/package/node-sass).

### Development

To start the development server with watchers, run `npm run dev` and wait for your bundle to build. The first bundle may take awhile. Navigate to `localhost:8080` in your browser to use with hot-reloader.

To test, run `npm test` to start the test watcher. Be sure to name your test file in a `<file-name>.test.<file-extension>` format.

### Production

To run the server with production build (which uses the production version of React and removes the redux-dev-tools extension), run `npm start`.

###### Last updated date: 2021-05-11
