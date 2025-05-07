import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 bg-white rounded-2xl shadow-2xl text-center mx-auto max-w-xl">
      <p className="text-gray-600 mb-4">
        The page you are trying to access does not exist :/
      </p>
      <Link
        href="/"
        className="text-blue-600 underline hover:text-blue-800 transition-colors"
      >
        return to homepage
      </Link>
    </div>
  );
}