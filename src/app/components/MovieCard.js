import Image from 'next/image'

export default function MovieCard({ movie }) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative aspect-[2/3]">
        <Image
          src={movie.poster}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h2 className="text-white font-semibold truncate">{movie.title}</h2>
      </div>
    </div>
  )
}

