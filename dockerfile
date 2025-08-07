# Use uma imagem base leve do Node.js (Alpine)
FROM node:18-alpine

# Crie e defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos do seu projeto para o contêiner
COPY . .

# Instale as dependências do Node.js
RUN npm install

# Comando para rodar o servidor quando o contêiner iniciar
CMD ["node", "server.js"]
