# Tripzz - Travel Planner App

## Table of contents

- [Overview](#overview)
  - [The project](#the-project)
  - [Key features](#key-features)
  - [Screenshot](#screenshot)
  <!-- - [Links](#links) -->
- [Built with](#built-with)

- [Getting started](#getting-started)

  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment setup](#environment-setup)

- [Running the application](#running-the-application)
- [Continued development](#continued-development)
- [Author](#author)

## Overview

### The project

This is a MERN stack application designed to help users plan their trips efficiently. Users can securely log in to access their personalized travel itineraries. The app leverages the Google Places API to provide relevant location data, enhancing the overall planning experience.

### Key features

- Secure user authentication and authorization
- Intuitive interface for creating and managing travel plans
- Comprehensive budget management tools
- Integration with Google Places API for location data
- Robust backend with Node.js, Express, and MongoDB

### Screenshot

![Desktop](./screenshots/desktop-screenshot.png)

![Mobile](./screenshots/mobile-screenshot.png)

<!-- ### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com) -->

## Built with

- HTML5
- Javascript
- Tailwind CSS
- Node.js, Express
- MongoDB
- React JS
- Google Places API
- JWT

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed
- A MongoDB account
- A Google Places API key

### Installation

**1. Clone the repository:**

git clone [https://github.com/thiagotars/tripzz-planner.git](https://github.com/thiagotars/tripzz-planner.git)

**2. Navigate into the project directory:**

cd tripzz-planner

**3. Install dependencies:**

npm install

### Environment Setup

**Important:** This project utilizes two separate .env files to manage environment variables.

1. Create a file named .env at the root of the project (tripzz-planner). This file will store frontend-related environment variables.
2. Create another .env file inside the backend folder. This file will store backend-specific environment variables.

Example .env files:

/tripzz-planner/.env:

VITE_GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
VITE_UNSPLASH_ACCESS_KEY=YOUR_UNSPLASH_ACCESS_KEY

/tripzz-planner/backend/.env:

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_JWT_SECRET
JWT_LIFETIME=YOUR_JWT_LIFETIME
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY

**Remember to replace the placeholders with your actual values.**

## Running the app

1. **Start the backend server:**
   Open a new terminal window and navigate to the backend directory.

   node index.js

2. **Start the frontend development server:**
   In a separate terminal window, stay in the root project directory and run:

   npm run dev

Your app should be accessible at http://localhost:3000

## Continued development

I am currently focused on implementing a robust user authentication and authorization system to enhance security and privacy. Once complete, users will be again able to create their own accounts and securely manage their travel plans.

I am committed to improving the overall user experience by:

    Enhancing UI/UX: Implementing smoother page transitions and visually appealing loading states.
    Expanding features: Introducing collaborative features that allow users to share and plan trips together.

These enhancements will contribute to a more enjoyable and efficient travel planning experience.

## Author

- Website - [Add your name here](https://www.your-site.com)
