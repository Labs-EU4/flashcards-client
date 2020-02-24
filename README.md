

[![Netlify Status](https://api.netlify.com/api/v1/badges/8c0f3795-6190-4b12-9051-5abaa6aaab10/deploy-status)](https://app.netlify.com/sites/sandy-quickdecks/deploys)


<img src="./src/assets/appimages/profile.jpg" />

# flashcards_frontend 

[QuickDecks Marketing Site](https://quickdecksapp.com/)

[QuickDecks Website](https://sandy-quickdecks.netlify.com/)

[QuickDecks BackEnd](https://quickdecks.herokuapp.com/)

[Notion Document](https://www.notion.so/EU3-Flashcards-439539312aa04de7b17c2f80da7dd400)

[Trello Board](https://trello.com/b/81h2pHYk/labseu3-flashcards)

[UI/UX](https://www.figma.com/file/MdKOQKnxJ0avxAIdMPhLne/Quick-Decks?node-id=1%3A4)

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
  - [Prettier Setup for VS Code](#prettier-setup-for-vs-code )
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

    $ git clone git@github.com:LABS-EU3/flashcards_frontend.git
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

    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint . -c .eslintrc.json --ext js,jsx ",
    "lint-fix": "eslint . -c .eslintrc.json --ext js,jsx, --fix",
    "check-staged": "lint-staged "
    
## Code Styling Conventions
- Tab Size: 2
- Use the single quote `'` 
- Always export objects even if only one function is being exported 
- Always name your files accordingly
- Only **one** index.js can exist and must be top level
- `Async/Await` instead of `.then()` etc...
- All component files should have the .jsx extension e.g login.jsx, signup.jsx.
- Use relative units and values for example { fonts-size: 2rem; } instead of hard-coded pixels { fonts-size: 20px } etc
- Use flexbox or percentages for layout instead of rems/ems/px


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
    REACT_APP_CLOUD_NAME = quick-decks --> app name
    REACT_APP_CLOUDINARY_SECRET = cloudinary client secret key --> from cloudinary registration 
    REACT_APP_CLOUDINARY_API_KEY = cloudinary client api key --> from cloudinary registration 
    

## Structure and Naming

```
  src
  |
  ├── assets
  |
  ├── components
  |   ├── addCardForm
  |   |   └── AddCardForm.js
  |   |
  |   ├── SearchBox
  |   |   ├── SearchBox.js
  |   |   └── styles.js
  |   └── signupForm
  |       └── SignupForm.js
  ├── config
  |   
  ├── module
  |   ├── dashboard
  |   |   ├── dashboardActions.js
  |   |   ├── dashboardReducer.js
  |   |   └── dashboardTypes.js
  |   └── user
  |       ├── userActions.js
  |       ├── userReducer.js
  |       └── userTypes.js
  |
  ├── pages
  |   ├── dashboard
  |   |   ├── route
  |   |   |   ├── DeckLibrary
  |   |   |   |   ├── components
  |   |   |   |   |   ├── DecksSection.js
  |   |   |   |   |   └── TopComponent.js
  |   |   |   |   └── DeckLibrary.js
  |   |   |   ├── LeaderBoard
  |   |   |   |   └── LeaderBoard.js
  |   |   ├── Dashboard.js
  |       └── DashboardLayout.js
  ├── store
  |
  ├── style
  |   ├── variables.js
  |   |   ├── colours.js
  |   |   ├── fonts.js
  |   |   └── global.js
  |   ├── background.js
  |   └── typography.js
  |
  ├── utils
  |   ├── auth.js
  |   ├── CloudinaryService.js
  |   └── useDispatchedActions.js
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
    const Home = () => <h1>Welcome to FlashCards</h1>;

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
    export const GET_HOME = 'GET_HOME';

    export const getHome = user => {
      return { type: GET_HOME, payload: user };
    };
    ```

  - Create Reducer

    ```js
    // src/modules/user/userReducers.js
    import { GET_HOME } from '../actions/home.js';

    const homeReducer = (state = initialState, action) => {
      switch (action.type) {
        case GET_HOME:
          return { ...state, home: action.payload };
        default:
          return state;
      }
    };

    export default userReducer;
    ```

  - Add Reducer to root reducer

    ```js
    // src/store/index.js
    import userReducer from '../modules/user/userReducers';

    const rootReducer = combineReducers({
      user: userReducer,
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(thunk)),
    );

    export default store;

    ```
    

## Built With

* [React](https://reactjs.org/) - The web framework used.
* [Redux](https://redux.js.org/) - State management tool.
* [Styled-components](https://www.styled-components.com/) - Write CSS in JavaScript.


## [Team](#team)

[Noble Obioma](https://github.com/nobioma1) | [Anna Winther](https://github.com/annawinther) | [John Omulosi](https://github.com/Omulosi) | [Richany Alina Nguon](https://github.com/richanynguon) |[Maaruf Dauda](https://github.com/emkayDauda) | [Oluwajoba Jobsy](https://github.com/Jobsy)<br>
| --- | --- | --- | --- | --- | --- |
[<img src="https://avatars1.githubusercontent.com/u/30900531?s=200&v=2" />](https://github.com/nobioma1) | [<img src="https://avatars1.githubusercontent.com/u/49450506?s=200&v=2" />](https://github.com/annawinther) | [<img src="https://avatars0.githubusercontent.com/u/10455781?s=200&v=2" />](https://github.com/Omulosi) | [<img src="https://avatars3.githubusercontent.com/u/49719812?s=200&v=2" />](https://github.com/richanynguon) | [<img src="https://avatars1.githubusercontent.com/u/29996742?s=200&v=2" />](https://github.com/emkayDauda) | [<img src="" />](https://github.com/Jobsy)
[<img src="https://github.com/favicon.ico" width="15" />](https://github.com/nobioma1) | [<img src="https://github.com/favicon.ico" width="15">](https://github.com/annawinther) | [<img src="https://github.com/favicon.ico" width="15" >](https://github.com/Omulos) | [<img src="https://github.com/favicon.ico" width="15" />](https://github.com/richanynguon) | [<img src="https://github.com/favicon.ico" width="15" />](https://github.com/emkayDauda) | [<img src="https://github.com/favicon.ico" width="15" />](https://github.com/Jobsy)


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

* Lambda 
