# 🌙 Masal Dünyası - AI Bedtime Story App

<div align="center">

![Version](https://img.shields.io/badge/version-0.1.0-purple.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue.svg)

**Çocuklarınız için yapay zeka destekli, kişiselleştirilmiş uyku masalları oluşturun** ✨

[Demo](#demo) • [Özellikler](#özellikler) • [Kurulum](#kurulum) • [Kullanım](#kullanım) • [Teknolojiler](#teknolojiler)

</div>

---

## 📖 Hakkında

**Masal Dünyası**, çocuklarınızın adını ve tercihlerini kullanarak benzersiz, kişiselleştirilmiş uyku masalları oluşturan bir yapay zeka uygulamasıdır. Her gece farklı bir macera, her hikaye özel ve unutulmaz!

### ✨ Neden Masal Dünyası?

- 🎯 **Kişiselleştirilmiş**: Çocuğunuzun adı hikayenin kahramanı olur
- 🤖 **AI Destekli**: Sonsuz hikaye olasılıkları
- 🔒 **Güvenli İçerik**: Ebeveyn kontrollü kelime filtreleri
- 🎨 **6 Farklı Tema**: Şato, uzay, orman, deniz, bulut, yıldız
- 🗣️ **8 Hikaye Anlatıcısı**: Nine, dede, peri, robot ve daha fazlası
- 📚 **Kütüphane**: Favori hikayelerinizi kaydedin

---

## 🎯 Özellikler

### 📝 Hikaye Oluşturma
- **Tema Seçimi**: 🏰 Şato, 🚀 Uzay, 🌳 Orman, 🐠 Deniz, ☁️ Bulut, ⭐ Yıldız
- **Süre Ayarı**: 2, 3 veya 5 dakikalık hikayeler
- **Ton Seçimi**: 😌 Sakin, 😄 Komik, 🚀 Macera
- **Kelime Kontrolü**: Hikayede olmasını istediğiniz/istemediğiniz kelimeler

### 🎙️ Hikaye Anlatıcıları
| Emoji | Anlatıcı | Stil |
|-------|----------|------|
| 👵 | Nine | Sıcak, sevecen |
| 👴 | Dede | Bilge, huzurlu |
| 🧚 | Peri | Büyülü, neşeli |
| 🤖 | Robot | Eğlenceli, teknolojik |
| 🦄 | Unicorn | Fantastik, renkli |
| 🐻 | Ayı | Sevimli, dostça |
| 🦉 | Baykuş | Gizemli, akıllı |
| 🌟 | Yıldız | Işıltılı, hayal dolu |

### 📚 Kütüphane
- Tüm hikayelerinizi saklayın
- Favorilerinizi işaretleyin
- Dinleme geçmişinizi takip edin

---

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Adımlar

```bash
# Repoyu klonlayın
git clone https://github.com/YOUR_USERNAME/masal-dunyasi.git

# Proje klasörüne gidin
cd masal-dunyasi

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda `http://localhost:5173` adresini açın.

---

## 📱 Mobil Uygulama

Capacitor ile iOS ve Android için native uygulama oluşturabilirsiniz:

```bash
# Capacitor kurulumu
npm install @capacitor/core @capacitor/cli
npx cap init

# iOS için
npm install @capacitor/ios
npx cap add ios
npx cap open ios

# Android için
npm install @capacitor/android
npx cap add android
npx cap open android
```

---

## 🛠️ Teknolojiler

| Kategori | Teknoloji |
|----------|-----------|
| ⚛️ Frontend | React 18 + TypeScript |
| 🎨 Styling | Tailwind CSS 4 |
| 🧩 UI Components | Radix UI + Shadcn/UI |
| 📦 Build Tool | Vite |
| 🤖 AI | Google Gemini API |
| 🗣️ Text-to-Speech | ElevenLabs API |
| 💾 Storage | LocalStorage |
| 📱 Mobile | Capacitor (opsiyonel) |

---

## 📁 Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── CreateStory.tsx     # Hikaye oluşturma
│   ├── GeneratingStory.tsx # Oluşturma animasyonu
│   ├── StoryReading.tsx    # Hikaye okuma
│   ├── StoryLibrary.tsx    # Kütüphane
│   ├── Profile.tsx         # Profil
│   ├── Welcome.tsx         # Hoş geldin
│   └── ui/                 # UI bileşenleri
├── services/            # API servisleri
│   └── storyAI.ts          # AI entegrasyonu
├── store/               # State yönetimi
│   └── useStoryStore.ts
├── types/               # TypeScript tipleri
├── lib/                 # Yardımcı fonksiyonlar
├── styles/              # CSS stilleri
└── assets/              # Görseller
```

---

## ⚙️ Ortam Değişkenleri

`.env` dosyası oluşturun:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

---

## 🤝 Katkıda Bulunma

1. Bu repoyu fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

---

## 👨‍💻 Geliştirici

**Tuğrul Kaya**

- GitHub: [@tugrulkaya](https://github.com/tugrulkaya)

---

<div align="center">

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**

Made with ❤️ for children's dreams 🌙

</div>