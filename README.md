# Getting Started with Create React App

This is a kanban application with authorization and a database of users and projects.

## Available Scripts

In the root project directory, you can run:

### `npm run app`

To start client

### `npm run api`

To start server

## Notes

#### For Backend

You need to add a .env file to the `api` directory, where specify these variables (for example):

##### API_PORT: `9090`

##### CLIENT_URL: `http://localhost:3000`

##### MONGO_URI: `mongodb+srv://...`

&nbsp;

#### For Frontend

You need to add a .env file to the `app` directory, where specify these variables (for example):

##### REACT_APP_API_URL: `http://localhost:9090`

&nbsp;

Also if you are using `VSC`, then make in the root of the project, where `api` & `app` folder `.vscode` or add the `settings.json` file there, where insert this parameter:

##### `"eslint.workingDirectories": ["app/", "api/"]`
