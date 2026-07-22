# Многостадийная сборка API. Стадия build компилирует TS -> dist,
# стадия runner запускает только скомпилированное (меньше и чище образ).

FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
# Prisma Client под платформу контейнера (Linux) + сборка Nest
RUN npx prisma generate && npm run build

FROM node:22-slim AS runner
WORKDIR /app
# Prisma в рантайме требует openssl
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json
EXPOSE 4000
# db push синхронизирует схему с БД при старте (миграций в проекте пока нет),
# --skip-generate: клиент уже собран на стадии build. Затем стартует сервер.
CMD ["sh", "-c", "npx prisma db push --skip-generate && node dist/main"]
