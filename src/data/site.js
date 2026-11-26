/* Asl sahifadagi matnlar — o'zgartirmasdan ko'chirilgan */

export const HIK_FEATURES = [
  { icon: 'clock', text: 'Kameralarni 24/7 jonli ko’rish' },
  { icon: 'history', text: 'Yozuvlarni qaytadan ko’rish' },
  { icon: 'bell', text: 'Harakat bo’lsa telefonga xabar' },
  { icon: 'smartphone', text: 'Ilovani o’rnatish va ulashni o’zimiz qilib beramiz' },
]

export const IVMS_FEATURES = [
  { icon: 'grid', text: 'Ko’plab kamerani bir ekranda ko’rish' },
  { icon: 'download', text: 'Yozuvlarni qidirish va yuklab olish' },
  { icon: 'monitor', text: 'Windows kompyuterga o’rnatib, sozlab beramiz' },
]

/* gallery — src/data/galleries.js dagi kalit */
export const INSTALL = [
  { gallery: 'dome', icon: 'dome', title: 'Dome kamera', desc: 'Ichki joylar uchun: uy, ofis, do’kon.' },
  { gallery: 'bullet', icon: 'video', title: 'Tashqi (bullet) kamera', desc: 'Hovli, kirish va ko’cha uchun.' },
  { gallery: 'yozuv', icon: 'server', title: 'Yozuv qurilmasi (DVR/NVR)', desc: 'Barcha kameralar yozuvi bir joyda.' },
  { gallery: 'kabel', icon: 'plug', title: 'Kabel tortish', desc: 'Toza va ishonchli montaj.' },
  { gallery: 'domofon', icon: 'bellRing', title: 'Domofon o’rnatish', desc: 'Video domofonni o’rnatib, ulab beramiz.' },
  { gallery: 'shlagbaum', icon: 'barrier', title: 'Shlagbaum o’rnatish', desc: 'Avtomatik shlagbaumni o’rnatib, sozlaymiz.' },
  { gallery: 'faceid', icon: 'scanFace', title: 'Face ID SKUD o’rnatish', desc: 'Yuz orqali kirish nazorati tizimini o’rnatamiz.' },
  { gallery: 'turniket', icon: 'turnstile', title: 'Turniket o’rnatish', desc: 'Turniketni o’rnatib, kirish nazoratiga ulaymiz.' },
]

export const REPAIR = [
  { icon: 'search', title: 'Nosozlikni aniqlash', desc: 'Rasm yo’q, yozuv ketmayapti — sababini topamiz.' },
  { icon: 'sliders', title: 'Qurilmani sozlash', desc: 'Vaqt, yozuv, tarmoq va ko’rish sozlamalari.' },
  { icon: 'refresh', title: 'Kamerani almashtirish', desc: 'Eskirgan kamerani yangisiga almashtiramiz.' },
  { icon: 'smartphone', title: 'Hik-Connect ulash', desc: 'Kameralarni telefoningizga ulab beramiz.' },
  { icon: 'hardDrive', title: 'Xotira (HDD) almashtirish', desc: 'Yozuv xotirasini tekshirish va almashtirish.' },
  { icon: 'lock', title: 'Parol tiklash', desc: 'Parol esdan chiqsa, qurilmaga kirishni tiklaymiz.' },
]

/* Narx guruhlari ikonkasi (prices.json dagi id bo'yicha) */
export const PRICE_ICONS = { kamera: 'video', shlagbaum: 'barrier', skud: 'scanFace' }

export const CATEGORIES = [
  { id: 'all', title: 'Hammasi' },
  { id: 'kamera', title: 'Kameralar' },
  { id: 'nvr', title: 'Yozuv va xotira' },
  { id: 'domofon', title: 'Domofon' },
  { id: 'kirish', title: 'Kirish nazorati' },
  { id: 'shlagbaum', title: 'Shlagbaum' },
  { id: 'tarmoq', title: 'Tarmoq va quvvat' },
  { id: 'ovoz', title: 'Ovoz tizimi' },
]
