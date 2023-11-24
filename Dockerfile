# Imagen Base
FROM node:20.9.0-alpine3.17
# Establecer directorio de trabajo
WORKDIR /app
# Copiar archivos
COPY package*.json ./
# Instalar dependencias
RUN npm install
# Copiar archivos
COPY . .
# Exponer puerto
EXPOSE 4000
# Ejecutar comando
CMD ["npm", "start"]
