# Use Node.js 14 as the base image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
