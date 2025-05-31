export default function Home() {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold">Welcome to Professionals Management</h1>
        <div className="space-y-4 text-center">
          <p className="text-lg text-gray-600">
            This is the main page of the Professionals Management application.
          </p>
          <p className="text-md text-gray-500">
            Use the sidebar on the left to navigate to different professionals pages:
          </p>
          <ul className="text-md space-y-2 text-gray-500">
            <li>
              • <strong>Professionals Page 1</strong> - Server-side rendering (SSR)
            </li>
            <li>
              • <strong>Professionals Page 2</strong> - Static site generation (SSG)
            </li>
            <li>
              • <strong>Professionals Page 3</strong> - Client-side rendering (CSR)
            </li>
          </ul>
          <p className="mt-8 text-sm text-gray-400">
            Each page demonstrates different Next.js data fetching techniques while displaying the
            same professionals data.
          </p>
        </div>
      </div>
    </div>
  );
}
