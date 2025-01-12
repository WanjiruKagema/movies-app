import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

const uri = process.env.MONGODB_URI
const options = {
  maxPoolSize: 10,
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
}

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export async function getAllMovies() {

  try {
    const client = await clientPromise
    const db = client.db('sample_mflix')

    // Add logging to help debug
    console.log('Connected to MongoDB successfully')

    const movies = await db.collection('movies').find({}).toArray()
    console.log("movies", movies)

    // Transform the _id to string to ensure proper JSON serialization
    const serializedMovies = movies.map(movie => ({
      ...movie,
      _id: movie._id.toString()
    }))

    return serializedMovies
    // db.collection("movies").insertMany([
    //   {
    //     "id": 1,
    //     "title": "The Shawshank Redemption",
    //     "year": 1994,
    //     "genre": ["Drama"],
    //     "rating": 9.3,
    //     "director": "Frank Darabont",
    //     "actors": ["Tim Robbins", "Morgan Freeman"],
    //     "plot": "Two imprisoned men bond over several years, finding solace and eventual redemption through acts of common decency.",
    //     "poster": "https://m.media-amazon.com/images/I/71715eBi1sL._AC_SL1000_.jpg",
    //     "trailer": "https://example.com/shawshank_redemption_trailer.mp4",
    //     "runtime": 142,
    //     "awards": "Nominated for 7 Oscars",
    //     "country": "USA",
    //     "language": "English",
    //     "boxOffice": "$28.3 million",
    //     "production": "Columbia Pictures",
    //     "website": "http://www.warnerbros.com/movies/shawshank-redemption"
    //   },
    //   {
    //     "id": 2,
    //     "title": "The Godfather",
    //     "year": 1972,
    //     "genre": ["Crime", "Drama"],
    //     "rating": 9.2,
    //     "director": "Francis Ford Coppola",
    //     "actors": ["Marlon Brando", "Al Pacino", "James Caan"],
    //     "plot": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    //     "poster": "https://m.media-amazon.com/images/M/MV5BYTJkNGQyZDgtZDQ0NC00MDM0LWEzZWQtYzUzZDEwMDljZWNjXkEyXkFqcGc@._V1_.jpg",
    //     "trailer": "https://example.com/the_godfather_trailer.mp4",
    //     "runtime": 175,
    //     "awards": "Won 3 Oscars",
    //     "country": "USA",
    //     "language": "English",
    //     "boxOffice": "$245.1 million",
    //     "production": "Paramount Pictures",
    //     "website": "https://www.paramountmovies.com/movies/the-godfather"
    //   },
    //   {
    //     "id": 3,
    //     "title": "The Dark Knight",
    //     "year": 2008,
    //     "genre": ["Action", "Crime", "Drama"],
    //     "rating": 9,
    //     "director": "Christopher Nolan",
    //     "actors": ["Christian Bale", "Heath Ledger", "Gary Oldman"],
    //     "plot": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    //     "poster": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
    //     "trailer": "https://example.com/the_dark_knight_trailer.mp4",
    //     "runtime": 152,
    //     "awards": "Won 2 Oscars",
    //     "country": "USA",
    //     "language": "English",
    //     "boxOffice": "$1.005 billion",
    //     "production": "Warner Bros. Pictures",
    //     "website": "https://www.warnerbros.com/movies/dark-knight"
    //   },
    //   {
    //     "id": 4,
    //     "title": "Pulp Fiction",
    //     "year": 1994,
    //     "genre": ["Crime", "Drama"],
    //     "rating": 8.9,
    //     "director": "Quentin Tarantino",
    //     "actors": ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    //     "plot": "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    //     "poster": "https://www.postergully.com/cdn/shop/products/pg1013.jpg?v=1578633270",
    //     "trailer": "https://example.com/pulp_fiction_trailer.mp4",
    //     "runtime": 154,
    //     "awards": "Won 1 Oscar",
    //     "country": "USA",
    //     "language": "English",
    //     "boxOffice": "$213.9 million",
    //     "production": "Miramax Films",
    //     "website": "https://www.miramax.com/movie/pulp-fiction"
    //   },
    //   {
    //     "id": 5,
    //     "title": "Forrest Gump",
    //     "year": 1994,
    //     "genre": ["Drama", "Romance"],
    //     "rating": 8.8,
    //     "director": "Robert Zemeckis",
    //     "actors": ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    //     "plot": "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.",
    //     "poster": "https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00YjQ5LTljYjgtMjY2NDVmYWMyNWFmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    //     "trailer": "https://example.com/forrest_gump_trailer.mp4",
    //     "runtime": 142,
    //     "awards": "Won 6 Oscars",
    //     "country": "USA",
    //     "language": "English",
    //     "boxOffice": "$677.9 million",
    //     "production": "Paramount Pictures",
    //     "website": "https://www.paramountmovies.com/movies/forrest-gump"
    //   },
    //   {
    //     "id": 6,
    //     "title": "Inception",
    //     "year": 2010,
    //     "genre": ["Action", "Adventure", "Sci-Fi"],
    //     "rating": 8.8,
    //     "director": "Christopher Nolan",
    //     "actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    //     "plot": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    //     "poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    //     "trailer": "https://example.com/inception_trailer.mp4",
    //     "runtime": 148,
    //     "awards": "Won 4 Oscars",
    //     "country": "USA",
    //     "language": "English",
    //     "boxOffice": "$829.9 million",
    //     "production": "Warner Bros. Pictures",
    //     "website": "https://www.warnerbros.com/movies/inception"
    //   },
    //   {
    //     "id": 7,
    //     "title": "The Matrix",
    //     "year": 1999,
    //     "genre": ["Action", "Sci-Fi"],
    //     "rating": 8.7,
    //     "director": "Lana Wachowski, Lilly Wachowski",
    //     "actors": ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    //     "plot": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    //     "poster": "https://images-na.ssl-images-amazon.com/images/I/71PfZFFz9yL.jpg",
    //     "trailer": "https://example.com/the_matrix_trailer.mp4",
    //     "runtime": 136,
    //     "awards": "Won 4 Oscars",
    //     "country": "USA",
    //     "language": "English",
    //     "boxOffice": "$463.5 million",
    //     "production": "Warner Bros. Pictures",
    //     "website": "https://www.warnerbros.com/movies/matrix"
    //   },
    //   {
    //     "id": 8,
    //     "title": "The Lord of the Rings: The Return of the King",
    //     "year": 2003,
    //     "genre": ["Adventure", "Drama", "Fantasy"],
    //     "rating": 8.9,
    //     "director": "Peter Jackson",
    //     "actors": ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
    //     "plot": "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    //     "poster": "https://m.media-amazon.com/images/M/MV5BMTZkMjBjNWMtZGI5OC00MGU0LTk4ZTItODg2NWM3NTVmNWQ4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    //     "trailer": "https://example.com/lotr_return_of_the_king_trailer.mp4",
    //     "runtime": 201,
    //     "awards": "Won 11 Oscars",
    //     "country": "USA",
    //     "language": "English",
    //     "boxOffice": "$1.142 billion",
    //     "production": "New Line Cinema",
    //     "website": "https://www.lordoftherings.net/film/the-return-of-the-king"
    //   },
    //   {
    //     "id": 9,
    //     "title": "The Dark Knight Rises",
    //     "year": 2012,
    //     "genre": ["Action", "Thriller"],
    //     "rating": 8.4,
    //     "director": "Christopher Nolan",
    //     "actors": ["Christian Bale", "Tom Hardy"],
    //     "plot": "Eight years after the Joker's reign of anarchy, Batman is forced out of retirement to save Gotham City from the brutal guerrilla terrorist Bane.",
    //     "poster": "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_.jpg",
    //     "trailer": "https://example.com/the_dark_knight_rises_trailer.mp4",
    //     "runtime": 165,
    //     "awards": "Nominated for 2 Oscars",
    //     "country": "USA",
    //     "language": "English",
    //     "boxOffice": "$1.081 billion",
    //     "production": "Warner Bros. Pictures",
    //     "website": "http://www.warnerbros.com/movies/the-dark-knight-rises"
    //   },
    //   {
    //     "id": 10,
    //     "title": "Interstellar",
    //     "year": 2014,
    //     "genre": ["Adventure", "Drama", "Sci-Fi"],
    //     "rating": 8.6,
    //     "director": "Christopher Nolan",
    //     "actors": ["Matthew McConaughey", "Anne Hathaway"],
    //     "plot": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    //     "poster": "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    //     "trailer": "https://example.com/interstellar_trailer.mp4",
    //     "runtime": 169,
    //     "awards": "Won 1 Oscar",
    //     "country": "USA",
    //     "language": "English",
    //     "boxOffice": "$677.5 million",
    //     "production": "Paramount Pictures",
    //     "website": "http://www.paramount.com/movies/interstellar"
    //   }
    // ])
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      code: error.code,
      codeName: error.codeName
    })
    return []
  }
}

// Test the connection
if (process.env.NODE_ENV === 'development') {
  clientPromise
    .then(() => console.log('MongoDB connection test successful'))
    .catch((error) => console.error('MongoDB connection test failed:', error))
}

export default clientPromise

