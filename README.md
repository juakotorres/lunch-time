# Lunch Time!

Is there any time were you cannot decide where to eat? Then this app is what you are looking for, it helps you pick a restaurant close to your location. 

The main features provided are restaurant search by keyword near you area and restaurant details containing pictures of dishes and the menu. More features to come! 

## How to run the project?

### Using docker compose

Build the project first if you have not built it before:

```bash
docker-compose up --build
```

You can run the project using:

```bash
docker-compose up
```

### Using npm

Before running the project, install the dependencies if you haven't:

```bash
npm install
```

After dependencies are installed, you can run the project with:

```bash
npm start
```

This command runs the app in the development mode. You can load the app by opening in [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page has hotload so it will reload for any edit. You will also see any lint errors in the console.

## How to run the tests?

You can run the tests with:

```bash
npm test
```

This launches the test runner in the interactive watch mode.

## How to build the app?

## Using docker

You can build the image:

```bash
docker build -t lunch-time-app .
```

The next steps is to push the image, and this needs configurations from the server. 

## Using npm

You can do that by running:

```bash
npm run build
```

This will build the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.