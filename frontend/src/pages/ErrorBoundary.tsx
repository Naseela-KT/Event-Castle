import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorBoundary: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    // Handle specific route errors (e.g., 404, 500)
    if (error.status === 404) {
      return <div>Page not found (404). Please check the URL.</div>;
    } else if (error.status === 500) {
      return <div>Internal Server Error (500). Please try again later.</div>;
    }
  }

  // General error handling
  return <div>Something went wrong. Please try again later.</div>;
};

export default ErrorBoundary;
