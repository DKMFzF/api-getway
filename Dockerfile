FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . . 
RUN npm run build

FROM gcr.io/distroless/nodejs20

WORKDIR /app
COPY --from=builder /app/dist /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/.env /app/.env

EXPOSE 5000

CMD ["server.js"]
