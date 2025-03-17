# Perwatch API

Node.js, Express, TypeScript ve MongoDB kullanılarak geliştirilmiş bir REST API projesi. Kullanıcı ve gönderi yönetimi için API endpoint'leri sunar.

## Özellikler

- Kullanıcı kaydı ve profil yönetimi
- Gönderi oluşturma, düzenleme, silme ve listeleme
- Swagger ile API dokümantasyonu
- MongoDB veritabanı entegrasyonu

## Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- MongoDB (v4 veya üzeri)
- npm veya yarn

### Adımlar

1. Repoyu klonlayın:
   git clone https://github.com/samet-gecgel/perwatch-api.git
   cd perwatch-api

2. Bağımlılıkları yükleyin:
   npm install

3. `.env` dosyasını oluşturun:
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/perwatch
   NODE_ENV=development

4. Uygulamayı başlatın:
   npm run dev

## Docker ile Kurulum

1. Docker ve Docker Compose'un yüklü olduğundan emin olun

2. Docker imajını oluşturun ve çalıştırın:
   docker-compose up -d

3. API'ye http://localhost:3000 adresinden erişebilirsiniz

## API Dokümantasyonu

API dokümantasyonuna http://localhost:3000/swagger adresinden erişebilirsiniz.

### Temel Endpoint'ler

#### Kullanıcılar

- `GET /api/users` - Tüm kullanıcıları listeler
- `GET /api/users/:id` - Belirli bir kullanıcıyı getirir
- `POST /api/users` - Yeni kullanıcı oluşturur
- `PUT /api/users/:id` - Kullanıcı bilgilerini günceller
- `DELETE /api/users/:id` - Kullanıcıyı siler

#### Gönderiler

- `GET /api/posts` - Tüm gönderileri listeler
- `GET /api/posts/:id` - Belirli bir gönderiyi getirir
- `GET /api/posts/user/:userId` - Belirli bir kullanıcının gönderilerini listeler
- `GET /api/posts/tag/:tag` - Belirli bir etikete sahip gönderileri listeler
- `POST /api/posts` - Yeni gönderi oluşturur
- `PUT /api/posts/:id` - Gönderi bilgilerini günceller
- `DELETE /api/posts/:id` - Gönderiyi siler
