FROM node:20-alpine
WORKDIR /app
COPY package.json ./
ENV API_URL=$PUBLIC_API_URL
RUN npm install
