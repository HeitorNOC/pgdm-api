FROM node:18.12.1-alpine

WORKDIR /pgdm-api
COPY . .

RUN npm install --legacy-peer-deps

EXPOSE 3333

CMD npx bun run dev
