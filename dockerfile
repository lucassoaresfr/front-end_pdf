# Use uma imagem base do Node.js
FROM node:20-slim

# Crie e defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos do seu projeto para o contêiner
COPY . .

# Instale as dependências do Node.js
RUN npm install

# Exponha a porta que o seu servidor vai rodar (3545 no seu caso)
EXPOSE 3545

# Comando para rodar o servidor quando o contêiner iniciar
CMD ["node", "server.js"]