# Base image
FROM node:18-alpine

# Çalışma dizinini oluştur
WORKDIR /app

# Package dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama kodlarını kopyala
COPY . .

# Port
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "start"] 