# Websocket Remote Control

Remote control backend using nutjs.dev library and websocket with supported commands:

- move mouse
- get mouse position
- draw circle
- draw square
- draw rectangle
- print screenshot of region 200x200 px around mouse position

See details in [task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/remote-control/assignment.md).

## ⚙️ How to install

Clone/download repo and install packages

```
npm ci
```

## 🚀 How to run

Run the application in production mode

```
npm start
```

Run the application in development mode

```
npm run start:dev
```

By default app use port 8080. You can change port in .env file.

## 💻 How to use

Use frontend from [here](https://github.com/rolling-scopes-school/remote-control):

clone or download its code, then install and run as described in its readme, and open http://localhost:8181/ in browser to get user interface.
