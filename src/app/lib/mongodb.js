import { MongoClient } from 'mongodb'

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
  
    // Transform the _id to string to ensure proper JSON serialization
    const serializedMovies = movies.map(movie => ({
      ...movie,
      _id: movie._id.toString()
    }))

    return serializedMovies
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

