# Imagen Base
FROM node:20.9.0-alpine3.17
# Establecer directorio de trabajo
WORKDIR /app
# Copiar archivos
COPY package*.json ./
# Instalar dependencias
RUN npm install
# Copia la carpeta prisma a la imagen
COPY prisma ./prisma
# Genera el cliente de prisma
RUN npx prisma generate
# Copiar archivos
COPY . .
# Exponer puerto
EXPOSE 4000
# Ejecutar comando
CMD ["npm", "start"]
