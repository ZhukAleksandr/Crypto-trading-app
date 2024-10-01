# Crypto Trading App

## Description
This is a cryptocurrency trading application built with **React**, **TypeScript**, **Vite**, **Zustand** for state management, and **React Query** for data fetching. It allows users to view a list of cryptocurrency assets, sort by name or price, and buy or sell assets. The trading feature is only available after logging in, using a fake authentication system for demonstration purposes.

## Demo
You can view a live demo of the project deployed via GitHub Pages here:  
[Demo](https://zhukaleksandr.github.io/Crypto-trading-app/)

## GitHub Repository
You can find the source code for this project in the following GitHub repository:  
[GitHub Repo](https://github.com/zhukaleksandr/Crypto-trading-app)

---

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (>= 14.x)
- npm or yarn (package managers)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zhukaleksandr/Crypto-trading-app.git
   cd crypto-trading-app
   
2. Install dependencies:
   
   npm install
   
4. Create a .env file:

   You need to create a .env file in the root directory of the project based on the contents of the provided .env.example file.
   You can find the .env.example file [env](https://github.com/ZhukAleksandr/Crypto-trading-app/blob/main/.env.example).
   For example:   
   VITE_API_URL=your_api_url_here
   
6. Run the development server (powered by Vite):   
   ```bash
   npm run dev
   
   This will start the Vite development server and open the project in your default browser.

  ### Building for Production
  To create an optimized production build using Vite, run:
  
    ```bash
    npm run build
    
  The production files will be located in the dist/ directory.

  ### Deploying to GitHub Pages
  
    To deploy the project on GitHub Pages, run:

    npm run deploy
    
    This command uses Vite's production build and deploys the dist/ folder to the gh-pages branch for hosting on GitHub Pages.

### Key Technologies:
- **React**: For building the user interface.
- **TypeScript**: For static type-checking and better developer experience.
- **Vite**: A fast and optimized build tool and development server for modern web applications.
- **Zustand**: A simple and scalable state management solution.
- **React Query**: For server state management, data fetching, and caching.
- **SCSS**: For styling with variables, mixins, and better structure.

### Folder Structure:
- `/components`: Contains reusable React components such as:
  - `/AuthModal`: Modal for authentication
  - `/CryptoRow`: Component representing a row of cryptocurrency data
  - `/CryptoTable`: Table component for displaying cryptocurrency data
  - `/Header`: Header component for navigation
  - `/PrivateRoute`: Component that restricts access to authenticated users
  - `/SortableHeader`: Header component for tables that supports sorting
  - `/TradeForm`: Form component for executing trades

- `/css`: contains global CSS
- `/interfaces`: Contains TypeScript interface definitions for the project
- `/pages`: Contains page components like `Home` and `Trade`
- `/services`: Contains API interaction
- `/store`: Contains Zustand store and state slices (e.g., `authSlice`)

- `App.tsx`: The main application component where the routing and main logic are handled
- `main.tsx`: The entry point of the React application

---

### Reasons for the Implementation Choices

#### React + TypeScript:
- **Pros**: TypeScript allows for better code scalability and safety by catching errors early. React is a widely-used, component-based library.

#### Vite for Build and Development:
- **Pros**: Vite provides extremely fast hot-reload during development and optimized builds for production.

#### Zustand for State Management:
- **Pros**: Simple API, minimal boilerplate, and works well for small-to-medium applications.
- **Cons**: May not be ideal for very complex apps where state relationships are more intricate.

#### React Query for Data Fetching:
- **Pros**: Handles async data fetching with caching, background updates, and retries.

#### SCSS for Styling:
- **Pros**: SCSS makes it easy to manage styles with variables and mixins, ensuring better maintainability.

#### CSS Modules for Scoped Styling:
- **Pros**: CSS Modules allow you to create scoped and modular styles by default, which avoids global class name collisions. This is especially useful in large applications where many components are styled independently.


---

### Assumptions and Potential Limitations
- **Fake Authentication**: The app uses a fake JWT for demonstration purposes. A real authentication system should be integrated for a production environment.
- **Data Source**: Crypto data is fetched from an external API, and errors are handled via React Query.
- **Mobile Responsiveness**: The app has basic styling for mobile but may need further adjustments for complete responsiveness.
- **Cross-Browser Compatibility**: Tested in modern browsers, but further testing may be required for full compatibility.

