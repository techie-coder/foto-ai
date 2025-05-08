FROM oven/bun:latest

ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true

WORKDIR /app

COPY . .

RUN bun install --ignore-scripts

WORKDIR /app/packages/db

RUN bunx prisma generate

WORKDIR /app/apps/backend

RUN bun install

EXPOSE 8080

CMD ["bun", "run", "start"]
