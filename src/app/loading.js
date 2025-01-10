export default function Loading() {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-900 rounded-lg overflow-hidden animate-pulse">
              <div className="aspect-[2/3] bg-gray-800" />
              <div className="p-4">
                <div className="h-4 bg-gray-800 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </main>
    )
  }
  
  