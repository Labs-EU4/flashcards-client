[![Netlify Status](https://api.netlify.com/api/v1/badges/8c0f3795-6190-4b12-9051-5abaa6aaab10/deploy-status)](https://app.netlify.com/sites/sandy-quickdecks/deploys)

<img src="./src/assets/appimages/profile.jpg" />

# decksify_frontend

[Decksify Marketing Site](https://decksify.com/)

[Decksify BackEnd](https://quickdecks.herokuapp.com/)

[Notion Document](https://www.notion.so/6e1c96f1d2824e55a4707311718edbef?v=81bf898f7fcb43fd9191a1c3eba7e306)

[Trello Board](https://trello.com/b/2J0Rpp3D/flashdecks)

[UI/UX](https://www.figma.com/file/CxIib8j9KlIV8SwIv9Kl7v/Flashcards-LABS-EU-4-mockups?node-id=7898%3A352)

[DB Design](https://dbdiagram.io/d/5def6f09edf08a25543eea12)

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
  - [Starting Development Server](#starting-development-server)
  - [Running the tests](#running-the-tests)
  - [Deployment / Build For Production](#deployment-build-for-production)
  - [Linting fix](#linting-fix)
  - [Eject hidden modules](#eject-hidden-modules)
  - [Scripts](#scripts)
  - [Code Styling Conventions](#code-styling-conventions)
  - [Code Guidelines](#code-guidelines)
  - [Setup formatting on Editor](#setup-formatting-on-editor)
  - [Prettier Setup for VS Code](#prettier-setup-for-vs-code)
  - [APIs](#apis)
  - [Environment Variables](#environment-variables)
  - [Structure and Naming](#structure-and-naming)
  - [Workflow](#workflow)
  - [Built With](#built-with)
  - [Meet the Team `(Team)`](#team)
  - [Team](#team)
  - [Contributing](#contributing)
  - [Requests](#requests)
  - [Pull Requests](#pull-requests)
    - [Pull Request Guidelines](#pull-request-guidelines)
  - [Feature Requests](#feature-requests)
  - [Issue / Bug Request](#issue-bug-request)
  - [Attribution](#attribution)
  - [Backend Documentation](#backend-documentation)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

For development, you will only need Node.js installed on your environment.

    $ node --version
    v10.16.3

    $ npm --version
    6.10.3

## Installing

    $ git clone https://github.com/Labs-EU4/flashcards-client
    $ cd flashcards_frontend
    $ npm install

## Starting Development Server

    $ npm start

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.

## Running the tests

    $ npm run test

Launches the test runner in the interactive watch mode.

## Deployment Build For Production

    $ npm run build

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

## Linting fix

    $ npm lint:fix

Fixes linting automatically.

## Eject hidden modules

    $ npm eject

Ejects hidden modules into `package.json`.

## Scripts

    "lint": "eslint .",
    "format": "prettier --write \"**/*.+(js|jsx|json|yml|yaml|css|md|vue)\"",
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --verbose --watchAll=false --coverage -u",
    "eject": "react-scripts eject"

## Code Styling Conventions

- Ant design components and style
- Use CSS modules
- `Async/Await` and `.then()` etc...

## Code Guidelines

- TDD is preferable but Test as soon as possible once you finish something
- **Never work on the same file!**

## Setup formatting on Editor

On VsCode:

- Go to `Settings` > `Text Editor` > `Formatting`
- Check `Format on Save`

Example:
![Format on save](https://res.cloudinary.com/elbon/image/upload/v1566300863/Screenshot_2019-08-20_at_12.31.41_PM.png)

## Prettier Setup for VS Code

- Install VS-Code extension below;

  - [x] Name: Prettier - Code formatter
  - [x] [VS Marketplace Link](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## APIs

We use [Cloudinary](https://cloudinary.com/) for images/videos content delivery

## Environment Variables

For the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

    PORT = port number on which the app will be open locally --> optional
    REACT_APP_API_HOST = link to your API host --> local backend url
    REACT_APP_CLOUD_NAME = decksify --> app name
    REACT_APP_CLOUDINARY_SECRET = cloudinary client secret key --> from cloudinary registration
    REACT_APP_CLOUDINARY_API_KEY = cloudinary client api key --> from cloudinary registration

## Structure and Naming

```
  src
  |
  ├── assets
  |
  ├── components
  |   ├──   CreateCard
  |   |   └── AddCard.js
  |   |   └── AddCard.module.css
  |   |   └── Cards.js
  |   |   └── UpdateCard.js
  |   |
  |   ├── DeckBoard
  |   |   ├── DeckCard.js
  |   |   └── deckCard.module.css
  |   |   └── DeckContainer.js
  |   |   └── EditForm.js
  |   |   └── EditModal.js
  |   |
  |   └── ErrorBoundary
  |   |   └── ErrorBoundary.js
  |   |
  |   | ── ForgotPassword
  |   |    └── FormComponent.js
  |   |    └── FormComponentChangePassword.js
  |   |
  |   | ── formStyleComponent
  |   |    └── FormHeader.js
  |   |    └── FormStyleComponent.js
  |   |    └── FormStyleComponent.css
  |   |
  |   | ── GoogleLogin
  |   |    └── GoogleButton.js
  |   |    └── GoogleButton.module.css
  |   |     
  |   | ──  Home
  |   |    └── Home.js
  |   |
  |   | ──  ListDeckInfo
  |   |    └── DeckCard.js
  |   |    └── DeckList.js
  |   |    └── DeckList.module.css
  |   |    └── HeaderSearchBar.js
  |   |    └── HeaderSearchBar.css
  |   | 
  |   | ──  NewDeckForm
  |   |    └── NewDeckForm.js
  |   |
  |   | ──  RecentDecks
  |   |    └── RecentDecks.js
  |   |    └── RecentDecks.module.css
  |   |
  |   |  ──  SetRecoveryPassword
  |   |    └── SetRecoveryPassword.js
  |   |    └── SetRecoveryPassword.module.less  
  |   |
  ├── layout 
  |   |──  Dashboard
  |   |    └── Dashboard.js
  |   |    └── Dashboard.module.css     
  |   |
  ├── pages
  |   ├── ConfirmSignUp
  |   |   ├── ConfirmSignUp.js
  |   |
  |   ├── Dashboard
  |   |   ├── dashboard.js
  |   |
  |   ├── ForgotPassword
  |   |   ├── ForgotPassword.js
  |   |   ├── ResetPassword.js
  |   |
  |   ├── GoogleLogin
  |   |   ├── GoogleLogin.js
  |   |   ├── GoogleLogin.module.less
  |   |
  |   ├── Login
  |   |   ├── Login.js
  |   |   ├── Login.module.css
  |   |
  |   ├── PersonalDecks
  |   |   ├── PersonalDecks.js
  |   |   ├── PersonalDecks.css
  |   |
  |   ├── PlayMode
  |   |   ├── PlayMode.js
  |   |   ├── PlayMode.module.less
  |   |
  |   ├── PublicDecks
  |   |   ├── PublicDecks.js
  |   |   ├── PublicDecks.module.css
  |   |
  |   ├── Register
  |   |   ├── Register.js
  |   |   ├── Register.module.css
  |   |
  |── router   
  |   ├── index.js
  |   |── RoutesConfig.js 
  |   |── SwitchRoutes.js 
  |   |   
  |   |   
  |   |  
  |   |   
  |   |   
  |    
  ├── store
  ├── config
  |
  ├── state
  |   ├── actions
  |   |   ├── auth.js
  |   |   ├── cardAction.js
  |   |   └── decks.js
  |   └── reducers
  |       ├── auth.js
  |       ├── decks.js
  |    └── types
  |       ├── index.js
  |       
  |       
  |
  |
  ├── utils
  |   ├── auth.js
  |   ├── axios.js
  |   └── deckTags.js
  |   └── diffArrays.js
  |   └── zipList.js
  |
  ├── App.js
  |
  └── index.js

```

## Workflow

- **Create a new `feature-branch` from `develop` branch that describes your work.**

  ```bash
    git checkout -b project-setup
  ```

Example:
![Create a New Branch](https://res.cloudinary.com/elbon/image/upload/v1566291009/branch-naming.png)

- **Adding a New Feature**

  - Create Component named `Home.js` related folder.

    ```js
    // src/component/Home.js
    const Home = () => <h1>Welcome to Decksify</h1>;

    export default Home;
    ```

  - Define Route

    ```js
    // src/App.js
    import Home from '../components/Home';

    ...
    <Route exact path="/" component={Home} />;
    ```

  - Create Action

    ```js
    // src/modules/user/userActions.js
    export const GET_HOME = "GET_HOME";

    export const getHome = user => {
      return {type: GET_HOME, payload: user};
    };
    ```

  - Create Reducer

    ```js
    // src/modules/user/userReducers.js
    import {GET_HOME} from "../actions/home.js";

    const homeReducer = (state = initialState, action) => {
      switch (action.type) {
        case GET_HOME:
          return {...state, home: action.payload};
        default:
          return state;
      }
    };

    export default userReducer;
    ```

  - Add Reducer to root reducer

    ```js
    // src/store/index.js
    import userReducer from "../modules/user/userReducers";

    const rootReducer = combineReducers({
      user: userReducer,
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

    export default store;
    ```

## Built With

- [React](https://reactjs.org/) - The web framework used.
- [Redux](https://redux.js.org/) - State management tool.
- [ant-design](https://ant.design) - A UI design Language and React UI.

## [Team](#team)

| [Chioma Nkem-Eze](https://github.com/Ofega)                                                                                            | [Niklas Becker](https://github.com/niklasbec)                                                                                           | [Babatunde Adeniran](https://github.com/TUNESHMAN)                                                                                     | [Sergei Kabuldzhanov](https://github.com/sergeikabuldzhanov)                                                                            | [Darragh Ferry](https://github.com/Darragh1996)                                                            
| [Maxwell Beard](https://github.com/maxjamb)
| [Luis Schekerka](https://github.com/KingLouie1994)
<br>                                     |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [<img src="https://avatars2.githubusercontent.com/u/23112599?s=400&v=4" />](https://github.com/Ofega) | [<img src="https://avatars1.githubusercontent.com/u/48069565?s=400&v=4" />](https://github.com/niklasbec) | [<img src="https://avatars2.githubusercontent.com/u/53819424?s=460&u=e1036cdfcb3bf3cf75a0c2fabb82a62d8f84a1e9&v=4" />](https://github.com/TUNESHMAN) | [<img src="https://avatars1.githubusercontent.com/u/55783724?s=400&v=4" />](https://github.com/sergeikabuldzhanov) | [<img src="https://avatars1.githubusercontent.com/u/26835105?s=400&v=4" />](https://github.com/Darragh1996) | [<img src="https://avatars3.githubusercontent.com/u/50669658?s=400&v=4" />](https://github.com/maxjamb) | [<img src="https://avatars0.githubusercontent.com/u/53607532?s=400&u=4198dc59a06dea2c75aa80b3ed88cbaa2bfc8715&v=4" />](https://github.com/KingLouie1994)                                      |
| [<img src="https://github.com/favicon.ico" width="15" />](https://github.com/Ofega)                   | [<img src="https://github.com/favicon.ico" width="15">](https://github.com/niklasbec)                     | [<img src="https://github.com/favicon.ico" width="15" >](https://github.com/TUNESHMAN)                     | [<img src="https://github.com/favicon.ico" width="15" />](https://github.com/sergeikabuldzhanov)                   | [<img src="https://github.com/favicon.ico" width="15" />](https://github.com/Darragh1996)                   | [<img src="https://github.com/favicon.ico" width="15" />](https://github.com/maxjamb) | [<img src="https://github.com/favicon.ico" width="15" />](https://github.com/KingLouie1994)

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

## Requests

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.
Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

- **Create Pull Request**

  - The PR title should concisely explain the change or addition.
    Example:
    ![Create a new PR](https://res.cloudinary.com/elbon/image/upload/v1566290222/PR%20Title.png)

  - The PR description should clearly state what the PR is about in detail.

- **Request a Review** from at least one team member.
  Example:
  ![Request team member to review PR](https://res.cloudinary.com/quick-decks/image/upload/v1580970564/pr-review_uzrwxt.png)

- **Resolve Requested Changes**
  Example:
  ![Resolve Changes](https://res.cloudinary.com/quick-decks/image/upload/v1580970554/pr-resolve_uwuvnv.png)

* **All CI status checks should be green**

* **Review approval should have been submitted before merging**

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Issue Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

### Backend Documentation

See [FlashCards](https://github.com/LABS-EU3/flashcards_backend) for details on the backend of our project.

## License

The MIT License (MIT)

Copyright (c) 2020 Pure Retail

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Acknowledgments

- Lambda
