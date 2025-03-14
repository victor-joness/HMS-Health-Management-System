# Usa uma imagem base do Node.js
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos necessários
COPY package.json package-lock.json ./
COPY tsconfig.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta usada pela API
EXPOSE 5005

# Comando para iniciar a API
CMD ["npm", "run", "dev"]