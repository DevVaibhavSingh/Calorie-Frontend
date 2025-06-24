# Meal Calorie Tracker - Frontend

This is the frontend application for the Meal Calorie Tracker project. It allows users to search for dish calories, track their nutrition, and manage their meals in a user-friendly interface.

## Setup Instructions

Follow the steps below to set up the project locally:

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/DevVaibhavSingh/Calorie-Frontend.git
    cd Calorie-Frontend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file by copying `.env.example`:
        ```bash
        cp .env.example .env
        ```
    - Update `.env` with your own API base URL if needed.

4. Run the development server:
    ```bash
    npm run dev
    ```

   This will start the application on `http://localhost:3000`.

5. Open the browser and visit `http://localhost:3000` to view the app.

## What can be imporved furher / Decisions
- **Optimized Folder Structure**:Placing all the code directly in page.tsx within the app directory is not considered a best practice. With more time, we could refactor the project by creating a separate views directory, organizing our pages using distinct components, and then importing those components into page.tsx from other directories.

- **Route Interceptor**: Checking user authorization directly on the Dashboard page is not an ideal approach. Instead, I would have preferred to implement a route interceptor to verify whether a user is logged in, which would help secure the routes more effectively. 

- **Dark Mode Implementation**: I decided to use a `darkMode` state stored in `localStorage` to persist the theme preference across sessions. This allows the user to maintain their theme preference even after refreshing the page.
  
- **User Authentication**: For the user authentication system, I am making use of a `useAuthStore` hook to handle authentication state globally.

- **API Integration**: The app communicates with a backend API that provides meal data and user information. The base URL for the API is configurable through the `.env` file.


## Hosted Link

The application is deployed and can be accessed at the following link:  
[Meal Calorie Tracker - Live Demo](https://calorie-calculator-git-main-realvaibhavsingh-gmailcoms-projects.vercel.app/)
