# Node.js Auth API with Redis Cache

JWT tabanlı kimlik doğrulama ve Redis cache sistemi içeren Node.js API projesi.

## Özellikler

- JWT Authentication
- Redis Cache 
- MySQL Database
- Docker Support

## Kurulum

### Docker ile:

1. Docker'ı yükleyin
2. Projeyi klonlayın
3. Docker compose ile başlatın:

```bash
docker-compose -f docker/docker-compose.yml up -d
```

### Manuel Kurulum:

1. Gerekli paketleri yükleyin:

```bash
npm install
```

2. .env dosyasını oluşturun:

```bash
cp .env.example .env
```

3. MySQL ve Redis servislerini başlatın

4. Uygulamayı başlatın:

```bash
npm start
```

## API Endpoints

### Auth

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
    "name": "Test User",
    "email": "test@example.com",
    "password": "123456"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
    "email": "test@example.com",
    "password": "123456"
}
```

### User

#### Get Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
    "name": "Updated Name"
}
```

## Cache Sistemi

Redis cache sistemi şu verileri önbelleğe alır:
- Kullanıcı profil bilgileri (TTL: 1 saat)
- Auth token bilgileri

Cache anahtarları:
- Kullanıcı profili: `user:{userId}:profile`
- Auth token: `auth:{userId}:token`

## Docker Komutları

```bash
# Servisleri başlat
docker-compose -f docker/docker-compose.yml up -d

# Servisleri durdur
docker-compose -f docker/docker-compose.yml down

# Logları görüntüle
docker-compose -f docker/docker-compose.yml logs -f
```

## Proje Yapısı

```
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── jwt.js
│   │   └── redis.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── cacheMiddleware.js
│   ├── models/
│   │   └── user.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── userService.js
│   │   └── cacheService.js
│   └── app.js
├── docker/
│   └── docker-compose.yml
├── tests/
│   └── http/
│       ├── all.http
│       ├── auth.http
│       ├── user.http
│       └── config.http
├── .env
├── .env.docker
├── Dockerfile
└── package.json
```

## Environment Variables

### Development (.env)
```env
PORT=3000

# DB Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=nodejs

# JWT Configuration
JWT_SECRET=your-secret-key

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

### Docker (.env.docker)
```env
PORT=3000

# DB Configuration
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=secret
DB_NAME=nodejs

# JWT Configuration
JWT_SECRET=your-secret-key

# Redis Configuration
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=
```

## HTTP Test Dosyaları

`tests/http` klasörü REST Client (VS Code eklentisi)
```
tests/http/
├── all.http     # Tüm test dosyalarını import eder
├── auth.http    # Kimlik doğrulama istekleri
├── user.http    # Kullanıcı profil istekleri
├── products.http # Ürün istekleri
└── config.http  # Global değişkenler
```

### Kullanım

1. VS Code'a REST Client eklentisini yükleyin
2. `.http` dosyalarını açın
3. İsteklerin üzerindeki "Send Request" butonuna tıklayın

### Environment Değişkenleri

`http-client.env.json` dosyasında ortam değişkenleri tanımlanabilir:

```json
{
    "development": {
        "baseUrl": "http://localhost:3000/api",
        "authToken": "your_auth_token_here"
    },
    "production": {
        "baseUrl": "https://api.example.com",
        "authToken": "your_auth_token_here"
    }
}
```

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.