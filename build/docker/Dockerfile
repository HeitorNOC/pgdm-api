FROM node:18.12.1-alpine

WORKDIR /pgdm-api
COPY . .

RUN bun install

EXPOSE 3333

CMD ["bun", "run", "dev"]
