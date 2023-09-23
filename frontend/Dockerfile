# Use an official Node.js runtime as the parent image
FROM node:18-bullseye

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install application dependencies
RUN npm install --only=production

# Bundle app source by copying the rest of the files
COPY . .

# Build the Next.js app
RUN npm run build

# The application listens on port 3000 by default, so we'll expose that
EXPOSE 3000

# Define the command to run the app
CMD [ "npm", "start" ]
