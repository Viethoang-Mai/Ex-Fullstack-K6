import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
    return (
        <div className="text-center mt-10">
            <h1 className="text-3xl font-bold mb-5">404 - Page Not Found</h1>
            <p className="text-lg">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link to="/" className="text-blue-500">
                Go to Home Page
            </Link>
        </div>
    );
}
