FROM node:18.12.1-alpine

WORKDIR /pgdm-api
COPY . .

# Instalar Bun manualmente
RUN apk add --no-cache curl bash && \
  curl -fsSL https://bun.sh/install | bash && \
  mv /root/.bun/bin/bun /usr/local/bin/bun

# Verifica se o Bun foi instalado corretamente
RUN bun --version

# Instala as dependências do projeto
RUN bun install

EXPOSE 3333

# Inicia o servidor usando Bun
CMD ["bun", "run", "dev"]
