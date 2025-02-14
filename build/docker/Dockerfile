FROM node:18.12.1-alpine

WORKDIR /pgdm-api
COPY . .

RUN apk add --no-cache curl bash && \
  curl -fsSL https://bun.sh/install | bash && \
  mv /root/.bun/bin/bun /usr/local/bin/bun

RUN bun install

EXPOSE 3333

CMD ["bun", "run", "dev"]
