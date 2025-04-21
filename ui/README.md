# WisGateOS 2.0 Extension Boilerplate

Main tech stack:

1. [React](https://reactjs.org/);
2. [TypeScript](https://www.typescriptlang.org/);
3. [Material UI v4](https://mui.com/);
4. [React-intl](https://formatjs.io/docs/react-intl/);
5. [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)

## How to run the extension locally (Development mode)

#### Setup config

Create `.env.development.local` file.

And set there `PORT=3001`.

In the `UI` folder run

```bash
yarn install
```

then

```bash
yarn start
```

And copy you local server address.

Go to `/<ext-name>/api/<ext-name>/config.json` and set to `localServer` field your local server address with PORT (for example `"localServer": "http://127.0.0.1:3001"`).

#### DO NOT FORGET to clear `localServer` field before commit or creating the production build.

Then open terminal in the `"create-rak-ext"` project and build the `IPK` file of your extension

```bash
$ ./create-rak-ext build <path-to-this-extension>
```

Then go to the WisGateOS web interface, extensions page and click `"Add new extension"` button to upload your `IPK` file. After installing, you can launch the extension from the list.

While developing, reload the page to see your changes immediately.

## Available Scripts

In the project directory, you can run:

###

#### Install:

```bash
yarn install
```

Install the dependencies in the local `node_modules` folder. The command will install all modules listed as dependencies in `package.json`.

###

#### Start:

```bash
yarn start
```

Runs the app in the development mode.<br />
Open [http://127.0.0.1:3000](http://127.0.0.1:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

###

#### Lint:

```bash
yarn lint
```

To automatically find problems into your code using [ESLint](https://eslint.org/).

```bash
yarn lint:fix
```

To automatically fix ESLint problems in your code.

###

#### Prettier:

```bash
yarn prettify
```

To automatically format your files using [Prettier](https://prettier.io/).

###

#### Source-map-explorer (analyze build size):

First, remove "GENERATE\*SOURCEMAP=false" from **\*.env.production**\_ file.

Then, create new build with source map using command

```bash
yarn build
```

Now you can analyze your build:

```bash
yarn analyze
```

Please, do not forget to add back "GENERATE_SOURCEMAP=false" in .env.production file.

###

#### Build:

```bash
yarn build
```

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

###

#### Eject:

```bash
yarn eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
s
