export default function Loading() {
  return (
    <div className="flex items-center space-x-2">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
      <div className="text-lg">Loading professionals...</div>
    </div>
  );
} 