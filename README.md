# Crypto Trading App

## Description
This is a cryptocurrency trading application built with **React**, **TypeScript**, **Zustand** for state management, and **React Query** for data fetching. It allows users to view a list of cryptocurrency assets, sort by name or price, and buy or sell assets. The trading feature is only available after logging in, using a fake authentication system for demonstration purposes.

## Demo
You can view a live demo of the project deployed via GitHub Pages here:  
[Demo]()

## GitHub Repository
You can find the source code for this project in the following GitHub repository:  
[GitHub Repo](
  
)

---

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (>= 14.x)
- npm or yarn (package managers)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd crypto-trading-app
2. Install dependencies:
  npm install
3. Run the development server:
  npm run dev

Building for Production
To create an optimized production build, run:
  npm run build

The production files will be located in the dist/ directory.

Deploying to GitHub Pages
To deploy the project on GitHub Pages, run:
  npm run deploy

Application Architecture
Key Technologies:
React: For building the user interface.
TypeScript: For static type-checking and better developer experience.
Zustand: A simple and scalable state management solution.
React Query: For server state management, data fetching, and caching.
SCSS: For styling with variables, mixins, and better structure.
Folder Structure:
/components: Contains reusable React components like SortableHeader.
/pages: Contains page components like Home and Trade.
/store: Contains Zustand store and state slices (e.g., authSlice).
/services: API interaction and utility functions.
/styles: SCSS files for global and component-specific styles.
Reasons for the Implementation Choices
React + TypeScript:
Pros: TypeScript allows for better code scalability and safety by catching errors early. React is a widely-used, component-based library.
Cons: Adds slight complexity due to the need for type definitions, but the benefits outweigh the cons.
Zustand for State Management:
Pros: Simple API, minimal boilerplate, and works well for small-to-medium applications.
Cons: May not be ideal for very complex apps where state relationships are more intricate.
React Query for Data Fetching:
Pros: Handles async data fetching with caching, background updates, and retries. It simplifies managing server state.
Cons: Can be overkill for apps with minimal data fetching requirements.
SCSS for Styling:
Pros: SCSS makes it easy to manage styles with variables and mixins, ensuring better maintainability.
Cons: Requires a build step for compilation.
Assumptions and Potential Limitations
Fake Authentication: The app uses a fake JWT for demonstration purposes. A real authentication system should be integrated for a production environment.
Data Source: Crypto data is fetched from an external API, and errors are handled via React Query.
Mobile Responsiveness: The app has basic styling for mobile but may need further adjustments for complete responsiveness.
Cross-Browser Compatibility: Tested in modern browsers, but further testing may be required for full compatibility.

