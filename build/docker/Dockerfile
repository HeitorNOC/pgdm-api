FROM oven/bun:1.0.3-alpine 

WORKDIR /pgdm-api
COPY . .

RUN bun install

EXPOSE 3333

CMD ["bun", "run", "dev"]
