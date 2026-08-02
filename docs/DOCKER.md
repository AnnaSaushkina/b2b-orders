# Docker — локальный запуск

Инфраструктура и приложение поднимаются локально через `docker-compose`.
Всё крутится на твоей машине: контейнеры — это изолированные процессы, не облако.

## Состав

```
твой Mac
├── Docker Desktop
│     ├── postgres:18   → localhost:5432   (данные: named volume pg-data)
│     └── redis:7       → localhost:6379   (заготовка под очередь, C5)
├── API (NestJS)        → localhost:4000
└── клиент (webpack)    → localhost:3000   ← UI смотришь здесь
```

## Два режима (по ТЗ ментора)

### Режим 1 — инфра в контейнерах, приложение на хосте (повседневная разработка)

```bash
docker compose up -d                 # поднять PostgreSQL + Redis
pnpm dev                             # клиент + API на хосте (hot-reload)
```
API ходит в БД по `localhost:5432`. Открываешь http://localhost:3000.

### Режим 2 — всё в контейнерах, включая API (прод-подобная сборка / проверка «докеризуется ли целиком»)

```bash
docker compose -f docker-compose.yml -f docker-compose.app.yml up -d --build
```
Здесь API ходит в БД по `postgres:5432` — по имени сервиса во внутренней сети compose,
не по `localhost` (внутри контейнера `localhost` = сам контейнер).

Остановить: `docker compose down` (данные в volume останутся) / `down -v` (снести с данными).

## Ключевые решения

- **Два файла, а не один.** Базовый `docker-compose.yml` = только инфра; `docker-compose.app.yml`
  добавляет сервис `api` через merge (`-f ... -f ...`), не дублируя PG/Redis. Режим 1 — для кода
  с hot-reload, режим 2 — без него, для проверки сборки.
- **`depends_on: condition: service_healthy`.** API стартует не когда контейнер БД «запустился»,
  а когда healthcheck подтвердил, что Postgres принимает соединения.
- **Named volume `pg-data`.** Данные переживают перезапуск/`down`; чистый сброс — `down -v`.
- **PostgreSQL 18** — по требованию ментора (18/19).
- **Многостадийный Dockerfile.** Отдельно стадия сборки (компиляция Nest + `prisma generate`),
  отдельно тонкий runtime-слой.
- **Redis** пока не используется в коде — заложен под фоновую очередь андеррайтинга (спринт C5).

## Грабли, которые ловили при запуске (и как чинили)

1. **`EADDRINUSE :::4000`** — контейнерный API (режим 2) и хостовый `pnpm dev` дрались за
   один host-порт 4000. Два процесса не слушают один порт → перед `pnpm dev` убрать контейнерный API.
2. **Два Postgres на `:5432`** — нативный `postgresql@16` (brew) и докерный PG18 одновременно.
   `localhost` резолвится в `127.0.0.1`, который держал нативный → запросы молча уходили не в тот
   сервер. Решение: `brew services stop postgresql@16`.
3. **database vs schema** — в DBeaver смотрели пустую базу `postgres` вместо `marven`. Данные в
   `marven → public → Product`. Один сервер, разные базы.

## Подключение к БД (DBeaver)

Host `localhost`, Port `5432`, Database `marven`, User `marven`, Password `marven`.
DBeaver подключается к серверу БД, а не к папке проекта.
