# Многостадийная сборка API. Стадия build компилирует TS -> dist,
# стадия runtime запускает только скомпилированное (меньше и чище образ).

# Prisma в рантайме требует openssl — ставим в базовый слой, его наследуют build и runtime
FROM node:24-slim AS base
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build
# prisma отдельным слоем до остального кода: generate не переигрывается при правке src
COPY prisma ./prisma
RUN npx prisma generate
COPY . .
RUN npm run build

FROM base AS runtime
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package.json ./
EXPOSE 4000
# migrate deploy накатывает существующие миграции (prisma/migrations) при старте.
# Точка входа — dist/src/main: в сборку попадает и prisma/seed.ts, поэтому tsc
# сохраняет структуру папок и main.js лежит в dist/src, а не в dist.
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main"]
