# AI Rules for Lovable App

This document outlines the core technologies used in this project and provides clear guidelines on which libraries to use for specific functionalities. Adhering to these rules ensures consistency, maintainability, and efficient development.

## Tech Stack Overview

*   **Frontend Framework**: React (v18) for building dynamic user interfaces.
*   **Language**: TypeScript for type safety and improved code quality.
*   **Build Tool**: Vite for a fast development experience and optimized builds.
*   **Styling**: Tailwind CSS for utility-first CSS styling, ensuring responsive and consistent designs.
*   **UI Components**: shadcn/ui, built on Radix UI, for accessible and customizable UI components.
*   **Icons**: Lucide React for a comprehensive set of vector icons.
*   **Routing**: React Router DOM for declarative navigation within the application.
*   **Backend & Database**: Supabase for authentication, database management, and real-time features.
*   **Form Management**: React Hook Form combined with Zod for robust form validation and handling.
*   **Data Fetching/Caching**: React Query for efficient server state management.
*   **Notifications**: A custom `useToast` hook built on `@radix-ui/react-toast` for user feedback.

## Library Usage Rules

To maintain a consistent and efficient codebase, please follow these guidelines when implementing new features or modifying existing ones:

*   **UI Components**: Always prioritize `shadcn/ui` components. If a required component is not available in `src/components/ui/` or needs significant customization, create a new component in `src/components/` and style it exclusively with Tailwind CSS. **Do not modify files within `src/components/ui/` directly.**
*   **Styling**: All styling must be done using **Tailwind CSS classes**. Avoid writing custom CSS in separate files or using inline styles, except for global styles defined in `src/index.css`.
*   **Icons**: Use icons from the `lucide-react` library.
*   **Routing**: Use `react-router-dom` for all navigation. All main application routes should be defined in `src/App.tsx`.
*   **State Management**:
    *   For global application state (e.g., user authentication, shopping cart), use **React Context** (e.g., `src/contexts/AuthContext.tsx`, `src/contexts/CartContext.tsx`).
    *   For local component state, use React's `useState` or `useReducer` hooks.
    *   For server state management (data fetching, caching, synchronization), use **React Query**.
*   **Forms**: Implement forms using **React Hook Form** for control and validation. Use **Zod** schemas for defining form validation rules, integrated via `@hookform/resolvers`.
*   **Backend Interaction**: All interactions with the database, authentication, and other backend services should be done through the `supabase` client instance provided in `src/integrations/supabase/client.ts`.
*   **Notifications**: For displaying toast notifications to the user, use the `useToast` hook available from `@/hooks/use-toast`.
*   **File Structure**: Adhere to the existing file structure:
    *   `src/pages/`: For top-level page components.
    *   `src/components/`: For reusable UI components.
    *   `src/components/sections/`: For larger, section-specific components used on pages.
    *   `src/components/layout/`: For layout-related components (Header, Footer).
    *   `src/contexts/`: For React Context providers.
    *   `src/hooks/`: For custom React hooks.
    *   `src/lib/`: For utility functions (e.g., `cn`).
    *   `src/integrations/`: For third-party service integrations (e.g., Supabase).
*   **Responsiveness**: All new components and features must be designed to be fully responsive across different screen sizes, utilizing Tailwind CSS's responsive utilities.