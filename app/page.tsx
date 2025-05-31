export default function Home() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Professionals Management
        </h1>
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-600">
            This is the main page of the Professionals Management application.
          </p>
          <p className="text-md text-gray-500">
            Use the sidebar on the left to navigate to different professionals pages:
          </p>
          <ul className="text-md text-gray-500 space-y-2">
            <li>• <strong>Professionals Page 1</strong> - Server-side rendering (SSR)</li>
            <li>• <strong>Professionals Page 2</strong> - Static site generation (SSG)</li>
            <li>• <strong>Professionals Page 3</strong> - Client-side rendering (CSR)</li>
          </ul>
          <p className="text-sm text-gray-400 mt-8">
            Each page demonstrates different Next.js data fetching techniques while displaying the same professionals data.
          </p>
        </div>
      </div>
    </div>
  );
}
