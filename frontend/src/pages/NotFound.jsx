import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-textPrimary p-6 text-center">
      <AlertTriangle size={64} className="text-accent mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-textSecondary mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-accent text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
