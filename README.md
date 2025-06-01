# Lunch Time!

Lunch Time is a simple web application that helps users discover nearby restaurants through a random selection of 20 options around a fixed location. It displays them on a map, allows keyword searches, and offers detailed views with photos, reviews, and routing via Google Maps.

## Challenge

When deciding where to eat, many people struggle with choice overload. Lunch Time simplifies this by randomly selecting nearby restaurants and presenting them with useful visual and contextual information.

This project was also designed as a full-stack technical exercise to showcase clean architecture, testing practices, CI/CD pipelines, and structured frontend/backend separation with modern web tools.

## Main features

- 📍 Display 20 restaurants around a fixed location.
- 🗺️ Interactive map (via Leaflet) showing pins for each restaurant and the user's current location.
- 🔍 Search restaurants by keyword.
- 📋 View a list of restaurants with ratings and addresses.
- ℹ️ View detailed info on each restaurant (photos, reviews, directions).

🎨 [Figma design available here](https://www.figma.com/design/9WnLD0bXpGokT1vpa5Q42E/Lunch-Time-?node-id=2019-1086&t=PrTgwJmcKE4BjVmE-1)

![Demo](./assets/demo.png)

### Incoming Features!

- Add restaurant type filters (e.g., sushi, cafe)
- Enable sorting by rating or distance
- Integrate routing/navigation using Google Maps
- Improve mobile responsiveness and UX for small screens

## Technologies Used

| Layer    | Tech Used                                 |
| -------- | ----------------------------------------- |
| Frontend | React, TypeScript, React Leaflet, Cypress |
| Backend  | Node.js, Express                          |
| API      | Google Places API                         |
| CI/CD    | GitHub Actions                            |
| Testing  | Jest, Cypress, Fishery                    |
| Quality  | ESLint, Prettier, Stylelint               |

## Getting Started

### Environment Variables

For local development, create a .env.development.local file in both the frontend/ and backend/ directories.

**Backend (/backend/.env.development.local)**

```
API_KEY=your_places_api_key
PORT=3001 # Optional - defaults to 3001 if omitted
```

`API_KEY` is required to authenticate with the Google Places API. You can obtain one from the [Google Cloud Console](https://console.cloud.google.com/)

**Frontend (/frontend/.env.development.local)**

```
REACT_APP_BACKEND_URL=http://localhost:3001
```

This URL points to the local backend proxy server. Ensure the backend is running before starting the frontend.

### How to run the project?

**Using Docker Compose**

This will run both the **frontend** and **backend** services using their respective `Dockerfile`s located in `/frontend` and `/backend`.

For first time setting up:

```bash
docker-compose up -d --build
```

In next instances you can run it using:

```bash
docker-compose up -d
```

The services will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### How to run the tests?

From the root, you can run tests separately for each service.

**Frontend Functional Tests**

For Cypress tests you need to have the application running on the background, so please make sure you could load the app in the previous step.

```bash
cd frontend
npm run cy:open
```

This launches the cypress UI in the interactive watch mode.

**Backend Unit Tests**

```bash
cd backend
npm run test
```

This will run all unit tests inside the backend folder.

### How to build the app?

#### Using docker (WIP)

You can build the image:

```bash
docker-compose build
```

This will build both frontend and backend containers using their respective Dockerfiles.

If you prefer to build each image manually:

```
docker build -t lunch-time-frontend ./frontend
docker build -t lunch-time-backend ./backend
```

Note: Pushing images to a remote server will require proper Docker registry credentials and server setup. (Not setup)

#### Using npm

You can do that by running:

```bash
cd frontend
npm run build
```

This will build the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

## Technical Decisions & Reasoning

### Frontend-Only → Full-Stack

Initially planned as a frontend-only app, it evolved into a full-stack app after realizing API keys needed to be secured. A backend proxy (Node.js + Express) was added to handle external API requests securely.

### Map Implementation

Used React Leaflet to avoid Google Maps' quotas and complexity. If switching to Google Maps becomes necessary later, the map component is abstracted and can be replaced with minimal effort.

### Places API Selection

- Started with Yelp: Easy signup, but restricted review access at free tier.
- Foursquare: No access after a week of waiting.
- Final Choice: Google Places API: Complete documentation, wide feature set, and better support for reviews and photos.

### Code Quality & Testing

- Added ESLint, Prettier, and Stylelint to enforce consistency and catch issues early.
- CI pipeline runs 4 jobs:
  - Frontend: quality control and functional tests.
  - Backend: quality control and unit tests.
- tests only run after code quality checks to save CI resources.
- Used Fishery for flexible, mockable test data across unit and functional tests.
  - Pros: Environment control and faster test runs.
  - Cons: Not true end-to-end testing; plan to add real E2E tests later.

### State Management

Opted to use React Context for shared state. Redux would offer better structure for scaling, but was skipped due to time constraints and app size. A known limitation is unnecessary re-renders and deeply nested contexts — would refactor if continuing.

## Project Structure

### Frontend

```
/src
  ├── api/         # Fetch wrappers for backend communication
  ├── assets/      # Images or static assets
  ├── components/  # Reusable UI components
  ├── contexts/    # React Context providers
  ├── hooks/       # Custom hooks
  ├── pages/       # App views and routes
```

### Backend

```
/src
  ├── routes/      # Express route definitions
  ├── services/    # Abstractions for external API calls (e.g., Google Places)
  ├── utils/       # Helper functions
  └── app.ts       # App entry point
  └── server.ts    # Server launch
```

### Trade-offs and Improvements

| Area             | Current Implementation          | Future Improvement                             |
| ---------------- | ------------------------------- | ---------------------------------------------- |
| API Reviews      | Mocked via Fishery              | Add live end-to-end testing with real data     |
| State Management | React Context                   | Migrate to Redux for scalable state handling   |
| Map Component    | Leaflet                         | Replace with Google Maps for advanced features |
| Test Coverage    | Unit + Cypress functional tests | Add backend integration and full E2E tests     |
| Docker Setup     | Dev environment only            | Add production-ready Dockerfile and config     |
| Code Reusability | Places API logic in services    | Refactor into shared module/interface          |
