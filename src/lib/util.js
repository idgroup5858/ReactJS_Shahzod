export const cx = (...parts) => parts.filter(Boolean).join(' ')

/* public/ ichidagi fayl manzili (base './' — github.io va custom domenda ham ishlaydi) */
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`

/* 150000 → "150 000" */
export const groupDigits = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const formatPrice = (price) => (price == null ? 'Kelishilgan holda' : `${groupDigits(price)} so’m`)
