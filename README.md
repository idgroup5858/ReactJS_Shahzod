# Shoxzodbek Hikvision System — vizitka sayt

Vite + React + Tailwind. GitHub Pages'da turadi (`.github/workflows/deploy.yml`), `main` ga har push'da o'zi yangilanadi.

```bash
npm install
npm run dev      # http://localhost:5180
npm run build
```

## Narxlarni o'zgartirish (yashirin panel)

1. Sayt pastidagi **«© Shoxzodbek Hikvision System»** yozuvini **10 marta tez** bosing.
2. Birinchi marta GitHub token so'raladi — bir marta kiritiladi, shu telefonda saqlanadi.
3. Narxni o'zgartirib **Saqlash** bosing → `public/prices.json` GitHub'ga yoziladi → 1–2 daqiqada hammaga ko'rinadi.

### Token olish (bir marta)
GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token:
- Repository access: **Only select repositories** → `ReactJS_Shahzod`
- Permissions → Repository permissions → **Contents: Read and write**
- Expiration: eng uzog'i. Muddati tugasa — yangisini yaratib, panelga qayta kiritiladi.

Token kodga yozilmaydi va hech kimga yuborilmaydi.

## Tuzilma
- `src/data/site.js` — xizmatlar, ta'mirlash, kategoriyalar (matnlar)
- `src/data/products.js`, `galleries.js`, `images.js` — mahsulotlar va rasmlar (`public/img/`)
- `public/prices.json` — narxlar (admin panel shu faylni yangilaydi)
- `src/config.js` — telefon, Instagram, Telegram, manzil, GitHub repo
