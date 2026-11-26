import { GITHUB } from '../config.js'

/* GitHub Contents API orqali public/prices.json ni o'qish va yozish.
   Token faqat egasining telefonida (localStorage) saqlanadi — kodda yo'q. */

const API = `https://api.github.com/repos/${GITHUB.owner}/${GITHUB.repo}/contents/${GITHUB.path}`
export const TOKEN_KEY = 'shahzod-gh-token'

export class GithubError extends Error {
  constructor(code, status) {
    super(code)
    this.code = code
    this.status = status
  }
}

function headers(token) {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

function toCode(status) {
  if (status === 401) return 'auth'
  if (status === 403) return 'forbidden'
  if (status === 404) return 'notfound'
  if (status === 409 || status === 422) return 'conflict'
  return 'unknown'
}

async function request(url, init) {
  let res
  try {
    res = await fetch(url, { cache: 'no-store', ...init })
  } catch {
    throw new GithubError('network', 0)
  }
  if (!res.ok) throw new GithubError(toCode(res.status), res.status)
  return res.json()
}

function encodeBase64(text) {
  const bytes = new TextEncoder().encode(text)
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin)
}

function decodeBase64(b64) {
  const bin = atob(b64.replace(/\s/g, ''))
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)))
}

export async function readPricesFile(token) {
  const file = await request(`${API}?ref=${GITHUB.branch}`, { headers: headers(token) })
  return { data: JSON.parse(decodeBase64(file.content)), sha: file.sha }
}

export async function writePricesFile(token, data, sha) {
  const body = {
    message: 'Narxlar yangilandi',
    content: encodeBase64(JSON.stringify(data, null, 2) + '\n'),
    sha,
    branch: GITHUB.branch,
  }
  const res = await request(API, {
    method: 'PUT',
    headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res.content.sha
}

export const ERROR_TEXT = {
  auth: 'Token noto’g’ri yoki muddati tugagan. Yangi token kiriting.',
  forbidden: 'Tokenda yozish huquqi yo’q. GitHub’da tokenga «Contents: Read and write» bering.',
  notfound: 'Repo yoki prices.json topilmadi. Token aynan ReactJS_Shahzod repo’siga berilganini tekshiring.',
  conflict: 'Narxlar boshqa joyda o’zgargan ekan. Eng so’nggisi yuklandi — qaytadan saqlang.',
  network: 'Internet bilan aloqa yo’q. Qaytadan urinib ko’ring.',
  unknown: 'Kutilmagan xatolik. Birozdan keyin qaytadan urinib ko’ring.',
}
