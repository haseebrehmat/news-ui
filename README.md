# News Portal 📰

A personalized news portal built with React, TypeScript, Zustand, and Tailwind CSS. This project allows users to register, login, and view personalized news feeds based on their preferences.

## Overview 🌟

### Stores 🏪

- **authStore**: Manages user authentication state, including login, registration, and fetching current user details.
- **preferenceStore**: Manages user preferences for news sources, categories, and authors.

### Components 🧩

- **AuthRedirect**: Redirects authenticated users to the feed page.
- **Navbar**: Navigation bar that displays different links based on authentication state.
- **ProtectedRoute**: Protects routes that require authentication.

### Pages 📄

- **Home**: Landing page with an overview of the features.
- **Articles**: Displays a list of articles with filtering options.
- **Feed**: Displays the user's personalized news feed.
- **Login**: Login form for users.
- **Register**: Registration form for new users.
- **Preferences**: Allows users to set their news preferences.

### App.tsx 🏠

The main application component that sets up the router and defines the routes for the application. It includes the `Navbar` and wraps the main content in a container.

## Getting Started 🚀

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/haseebrehmat/news-ui.git
   cd news-ui
   ```

2. Install dependencies:
    ```sh
    yarn install
    ```

### Running the Development Server
```sh
yarn dev
```
### Building for Production
```sh
yarn build
```

### Linting & Formatting
```sh
yarn run format
yarn run lint
```

## Project Structure 📂
```sh
news-portal/
├── src/
│   ├── components/
│   │   ├── AuthRedirect.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── index.tsx
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── vite-env.d.ts
│   ├── pages/
│   │   ├── Articles.tsx
│   │   ├── Feed.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Preferences.tsx
│   │   ├── Register.tsx
│   │   └── index.tsx
│   ├── store/
│   │   ├── authStore.ts
│   │   └── preferenceStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── .prettierrc
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
