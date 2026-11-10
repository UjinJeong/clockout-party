# One container: builds the web client and runs the game server that also serves it.
FROM node:22-slim
WORKDIR /app
COPY package.json package-lock.json ./
COPY shared/package.json shared/
COPY server/package.json server/
COPY client/package.json client/
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build
ENV NODE_ENV=production PORT=2567
EXPOSE 2567
CMD ["npm", "start"]
