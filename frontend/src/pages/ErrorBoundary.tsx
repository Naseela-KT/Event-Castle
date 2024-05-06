import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ErrorBoundary: React.FC = () => {
 const error = useRouteError();

 let errorMessage = 'Something went wrong. Please try again later.';
 if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      errorMessage = 'Page not found (404). Please check the URL.';
    } else if (error.status === 500) {
      errorMessage = 'Internal Server Error (500). Please try again later.';
    }else{
      errorMessage = error.statusText;

    }
 }

 return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <img src="https://media.istockphoto.com/id/1421859468/vector/3d-vector-yellow-warning-sign-with-exclamation-mark-concept.jpg?s=612x612&w=0&k=20&c=E38zZfwJokA7oTnmg0fISVZH9YfrU3ILPeNGPMFg330=" alt="Error" className="w-full max-w-md mb-8" />
      <div className="text-lg mb-4">{errorMessage}</div>
      <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go Home
      </Link>
    </div>
 );
};

export default ErrorBoundary;

