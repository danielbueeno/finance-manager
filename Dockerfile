# 1. Use official Node.js image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and lock file
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the entire app
COPY . .

# 6. Build the Next.js app
RUN npm run build

# 7. Expose port and run app
EXPOSE 3000
CMD ["npm", "start"]
