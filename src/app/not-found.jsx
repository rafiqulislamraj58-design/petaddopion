import Link from "next/link";
import { Button } from "@heroui/react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-500">404</h1>
        <h2 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          Oops! The page you are looking for does not exist.
        </p>
        <Link href="/">
          <Button color="primary" size="lg">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}