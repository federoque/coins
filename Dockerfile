FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run tsc
ENV PORT=$PORT
EXPOSE $PORT
CMD ["npm", "start"]
