export default function Home() {
  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">
          Next.js Rendering Patterns Demo
        </h1>

        <div className="mb-8 text-center">
          <p className="mb-4 text-lg text-gray-600">
            This application demonstrates 5 different Next.js rendering patterns using a
            professionals management system.
          </p>
          <p className="text-md text-gray-500">
            Each page fetches the same data but uses different rendering strategies to showcase
            performance and user experience differences.
          </p>
        </div>

        <div className="space-y-4">
          {/* SSR Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center">
              <div className="rounded-full bg-blue-100 p-2">
                <span className="font-semibold text-blue-600">SSR</span>
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Server-Side Rendering</h3>
            </div>
            <p className="mb-3 text-sm text-gray-600">
              Fresh data on every request. Server renders HTML with up-to-date content.
            </p>
            <div className="text-xs text-gray-500">
              <p>✅ Always fresh data</p>
              <p>⚡ Good SEO</p>
              <p>⏱️ Slower initial load</p>
            </div>
          </div>

          {/* ISR Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center">
              <div className="rounded-full bg-green-100 p-2">
                <span className="font-semibold text-green-600">ISR</span>
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">
                Incremental Static Regeneration
              </h3>
            </div>
            <p className="mb-3 text-sm text-gray-600">
              Static generation with periodic revalidation (5 minutes). Best of both worlds.
            </p>
            <div className="text-xs text-gray-500">
              <p>⚡ Fast static performance</p>
              <p>🔄 Periodic fresh data</p>
              <p>📈 Great SEO</p>
            </div>
          </div>

          {/* CSR Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center">
              <div className="rounded-full bg-orange-100 p-2">
                <span className="font-semibold text-orange-600">CSR</span>
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Client-Side Rendering</h3>
            </div>
            <p className="mb-3 text-sm text-gray-600">
              Data fetched in browser using React hooks. Interactive and dynamic.
            </p>
            <div className="text-xs text-gray-500">
              <p>🎯 Highly interactive</p>
              <p>⚡ Fast navigation</p>
              <p>❌ Poor initial SEO</p>
            </div>
          </div>

          {/* PPR Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center">
              <div className="rounded-full bg-purple-100 p-2">
                <span className="font-semibold text-purple-600">PPR</span>
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Partial Prerendering</h3>
            </div>
            <p className="mb-3 text-sm text-gray-600">
              Static shell with streaming dynamic content. Instant load + fresh data.
            </p>
            <div className="text-xs text-gray-500">
              <p>🚀 Instant static shell</p>
              <p>🌊 Streaming dynamic content</p>
              <p>⭐ Best performance</p>
            </div>
          </div>

          {/* Activity Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center">
              <div className="rounded-full bg-pink-100 p-2">
                <span className="font-semibold text-pink-600">Activity</span>
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">React Activity API</h3>
            </div>
            <p className="mb-3 text-sm text-gray-600">
              Pre-renders page 5 in hidden mode while you&apos;re on any other page. Instant
              activation when you navigate to it.
            </p>
            <div className="text-xs text-gray-500">
              <p>🚀 Pre-rendered content</p>
              <p>💾 State preservation</p>
              <p>⚡ Instant activation</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Navigate using the sidebar to explore each rendering pattern. The Activity API is
            pre-rendering page 5 right now in the background!
          </p>
        </div>
      </div>
    </div>
  );
}
