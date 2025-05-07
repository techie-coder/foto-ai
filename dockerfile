FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install

WORKDIR /app/apps/backend

RUN bunx prisma generate && bun install

EXPOSE 8080

CMD ["bun", "run", "start"]
