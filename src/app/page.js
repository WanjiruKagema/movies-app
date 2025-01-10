import MovieGrid from '@/components/MovieGrid'
import { getAllMovies } from '@/lib/mongodb'

export default async function Home() {
  try {
    const movies = await getAllMovies()

    if (!movies.length) {
      return (
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-8">Movies</h1>
          <div className="text-white text-center">
            No movies found. Please check your database connection.
          </div>
        </main>
      )
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Movies</h1>
        <MovieGrid movies={movies} />
      </main>
    )
  } catch (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Movies</h1>
        <div className="text-red-500 text-center">
          Error loading movies. Please try again later.
        </div>
      </main>
    )
  }
}

