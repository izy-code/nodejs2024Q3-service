FROM node:22-alpine3.20 AS build

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npm run build

FROM node:22-alpine3.20 AS production

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma/

RUN npm ci --only=production

COPY --from=build /app/tsconfig*.json ./
COPY --from=build /app/doc/api.yaml ./doc/api.yaml
COPY --from=build /app/dist ./dist/

ENV BACKEND_PORT=4000
EXPOSE $BACKEND_PORT

CMD ["npm", "run", "start:dev:migrate"]