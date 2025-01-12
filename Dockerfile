# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

ENV MONGODB_URI='mongodb+srv://maureenkagema:Chick3nf00t@movies.sbdsj.mongodb.net/?retryWrites=true&w=majority&appName=Movies'

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]