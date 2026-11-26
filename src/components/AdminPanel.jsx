import { useCallback, useEffect, useState } from 'react'
import { ERROR_TEXT, readPricesFile, TOKEN_KEY, writePricesFile } from '../lib/github.js'
import { usePrices } from '../lib/prices.jsx'
import { cx, groupDigits } from '../lib/util.js'
import Icon from './Icon.jsx'
import Sheet from './Sheet.jsx'

/* Yashirin narx paneli — footer'dagi © ni 10 marta tez bosganda ochiladi.
   Birinchi marta GitHub token so'raydi (faqat shu telefonda saqlanadi),
   keyin narxlarni o'zgartirib, GitHub'dagi public/prices.json ga yozadi. */

const readToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY) || ''
  } catch {
    return ''
  }
}

/* prices.json → tahrirlash holati (narx matn ko'rinishida, "kelishilgan" alohida belgi) */
const toDraft = (data) => ({
  ...data,
  groups: data.groups.map((g) => ({
    ...g,
    rows: g.rows.map((r) => ({ label: r.label, digits: r.price == null ? '' : String(r.price), neg: r.price == null })),
  })),
})

const fromDraft = (draft) => ({
  updatedAt: new Date().toISOString(),
  groups: draft.groups.map(({ rows, ...g }) => ({
    ...g,
    title: g.title.trim(),
    rows: rows.map((r) => ({ label: r.label.trim(), price: r.neg ? null : Number(r.digits) })),
  })),
})

const validate = (draft) => {
  for (const g of draft.groups) {
    if (!g.title.trim()) return 'Bo’lim nomi bo’sh qolmasin.'
    for (const r of g.rows) {
      if (!r.label.trim()) return `«${g.title}» ichida qator nomi bo’sh qolgan.`
      if (!r.neg && !(Number(r.digits) > 0)) return `«${r.label}» uchun narx kiriting yoki «Kelishilgan» ni belgilang.`
    }
  }
  return ''
}

export default function AdminPanel({ open, onClose }) {
  const { applyLocal } = usePrices()
  const [token, setToken] = useState(readToken)
  const [tokenInput, setTokenInput] = useState('')
  const [phase, setPhase] = useState('token') // token | loading | edit | saving | saved
  const [error, setError] = useState('')
  const [draft, setDraft] = useState(null)
  const [sha, setSha] = useState(null)
  const [dirty, setDirty] = useState(false)

  const forgetToken = useCallback(() => {
    try {
      localStorage.removeItem(TOKEN_KEY)
    } catch {
      /* e'tiborsiz */
    }
    setToken('')
    setPhase('token')
  }, [])

  const load = useCallback(
    async (tk, message = '') => {
      setPhase('loading')
      setError(message)
      try {
        const file = await readPricesFile(tk)
        setDraft(toDraft(file.data))
        setSha(file.sha)
        setDirty(false)
        setPhase('edit')
      } catch (e) {
        setError(ERROR_TEXT[e.code] ?? ERROR_TEXT.unknown)
        if (e.code === 'auth' || e.code === 'notfound' || e.code === 'forbidden') forgetToken()
        else setPhase('error')
      }
    },
    [forgetToken],
  )

  useEffect(() => {
    if (!open) return
    if (token) load(token)
    else setPhase('token')
  }, [open, token, load])

  /* Yopilganda eski xato matni keyingi ochilishga qolmasin */
  useEffect(() => {
    if (!open) setError('')
  }, [open])

  const submitToken = (e) => {
    e.preventDefault()
    const tk = tokenInput.trim()
    if (!tk) return
    try {
      localStorage.setItem(TOKEN_KEY, tk)
    } catch {
      /* e'tiborsiz */
    }
    setTokenInput('')
    setToken(tk)
  }

  const update = (fn) => {
    setDraft((d) => {
      const next = structuredClone(d)
      fn(next)
      return next
    })
    setDirty(true)
    setError('')
  }

  const save = async () => {
    const problem = validate(draft)
    if (problem) {
      setError(problem)
      return
    }
    setPhase('saving')
    setError('')
    const data = fromDraft(draft)
    try {
      const newSha = await writePricesFile(token, data, sha)
      setSha(newSha)
      setDirty(false)
      applyLocal(data)
      setPhase('saved')
    } catch (e) {
      const message = ERROR_TEXT[e.code] ?? ERROR_TEXT.unknown
      if (e.code === 'conflict') return load(token, message)
      setError(message)
      if (e.code === 'auth') forgetToken()
      else setPhase('edit')
    }
  }

  const footer =
    phase === 'edit' || phase === 'saving' ? (
      <button
        type="button"
        onClick={save}
        disabled={phase === 'saving' || !dirty}
        className="bg-brand shadow-brand flex w-full items-center justify-center gap-2.5 rounded-2xl px-5 py-4 font-bold text-white transition active:scale-[.98] disabled:opacity-50 disabled:shadow-none"
      >
        {phase === 'saving' ? (
          <>
            <Icon name="loader" className="size-5 animate-spin" /> Saqlanmoqda…
          </>
        ) : (
          <>
            <Icon name="check" className="size-5" /> {dirty ? 'Saqlash' : 'O’zgarish yo’q'}
          </>
        )}
      </button>
    ) : null

  return (
    <Sheet open={open} onClose={onClose} title="Narxlarni o’zgartirish" subtitle="Admin panel" footer={footer}>
      {error && (
        <div className="animate-fade-in mb-4 rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm font-semibold text-accent">
          {error}
        </div>
      )}

      {phase === 'token' && (
        <form onSubmit={submitToken} className="py-2">
          <div className="mx-auto mb-4 grid size-16 place-items-center rounded-3xl bg-accent/10 text-accent">
            <Icon name="lock" className="size-8" />
          </div>
          <p className="text-center text-[15px] text-muted">
            Bir martalik GitHub tokenni kiriting. U faqat shu telefonda saqlanadi, keyingi safar so’ralmaydi.
          </p>
          <input
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="github_pat_…"
            autoComplete="off"
            spellCheck={false}
            className="mt-5 w-full rounded-2xl border border-line bg-surface px-4 py-3.5 font-mono text-sm outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={!tokenInput.trim()}
            className="bg-brand mt-3 w-full rounded-2xl px-5 py-4 font-bold text-white transition active:scale-[.98] disabled:opacity-50"
          >
            Kirish
          </button>
        </form>
      )}

      {phase === 'error' && (
        <div className="py-8 text-center">
          <button
            type="button"
            onClick={() => load(token)}
            className="inline-flex items-center gap-2 rounded-2xl border border-line px-5 py-3.5 font-bold transition active:scale-[.98]"
          >
            <Icon name="refresh" className="size-5" /> Qayta urinish
          </button>
        </div>
      )}

      {phase === 'loading' && (
        <div className="grid place-items-center gap-3 py-14 text-muted">
          <Icon name="loader" className="size-8 animate-spin text-accent" />
          Narxlar yuklanmoqda…
        </div>
      )}

      {(phase === 'edit' || phase === 'saving') && draft && (
        <fieldset disabled={phase === 'saving'} className="space-y-4">
          {draft.groups.map((g, gi) => (
            <div key={g.id ?? gi} className="rounded-3xl border border-line bg-surface p-3.5">
              <input
                value={g.title}
                onChange={(e) => update((d) => (d.groups[gi].title = e.target.value))}
                aria-label="Bo’lim nomi"
                className="w-full rounded-xl bg-transparent px-1.5 py-1 text-[17px] font-extrabold outline-none focus:bg-surface-2"
              />
              <div className="mt-2 space-y-2.5">
                {g.rows.map((r, ri) => (
                  <div key={ri} className="space-y-2 rounded-2xl bg-surface-2 p-3">
                    <div className="flex gap-2">
                      <input
                        value={r.label}
                        onChange={(e) => update((d) => (d.groups[gi].rows[ri].label = e.target.value))}
                        placeholder="Masalan: Urganch shahar bo’ylab"
                        aria-label="Qator nomi"
                        className="min-w-0 flex-1 rounded-xl border border-line bg-bg px-3 py-2.5 text-[15px] outline-none focus:border-accent"
                      />
                      <button
                        type="button"
                        onClick={() => update((d) => d.groups[gi].rows.splice(ri, 1))}
                        disabled={g.rows.length === 1}
                        aria-label="Qatorni o’chirish"
                        className="grid size-11 shrink-0 place-items-center rounded-xl text-muted transition hover:bg-accent/10 hover:text-accent disabled:opacity-30"
                      >
                        <Icon name="trash" className="size-[18px]" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative min-w-0 flex-1">
                        <input
                          inputMode="numeric"
                          value={r.neg ? '' : groupDigits(r.digits)}
                          onChange={(e) =>
                            update((d) => (d.groups[gi].rows[ri].digits = e.target.value.replace(/\D/g, '').slice(0, 10)))
                          }
                          disabled={r.neg}
                          placeholder={r.neg ? 'Kelishilgan holda' : '0'}
                          aria-label="Narx"
                          className="w-full rounded-xl border border-line bg-bg py-2.5 pr-14 pl-3 text-[17px] font-extrabold tabular-nums outline-none focus:border-accent disabled:font-semibold disabled:opacity-60"
                        />
                        <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm font-semibold text-muted">
                          so’m
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => update((d) => (d.groups[gi].rows[ri].neg = !r.neg))}
                        aria-pressed={r.neg}
                        className={cx(
                          'flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2.5 text-[13px] font-bold transition',
                          r.neg ? 'border-accent bg-accent text-white' : 'border-line text-muted',
                        )}
                      >
                        <Icon name="check" className={cx('size-4', !r.neg && 'opacity-30')} />
                        Kelishilgan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => update((d) => d.groups[gi].rows.push({ label: '', digits: '', neg: false }))}
                className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-line py-3 text-sm font-bold text-muted transition hover:border-accent hover:text-accent"
              >
                <Icon name="plus" className="size-4" /> Qator qo’shish
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={forgetToken}
            className="mx-auto flex items-center gap-2 py-2 text-sm font-semibold text-muted transition hover:text-accent"
          >
            <Icon name="logOut" className="size-4" /> Tokenni shu telefondan o’chirish
          </button>
        </fieldset>
      )}

      {phase === 'saved' && (
        <div className="py-8 text-center">
          <div className="animate-pop bg-brand shadow-brand mx-auto grid size-20 place-items-center rounded-full text-white">
            <Icon name="check" className="size-10" strokeWidth={2.5} />
          </div>
          <h4 className="mt-5 text-xl font-extrabold">Saqlandi!</h4>
          <p className="mx-auto mt-2 max-w-sm text-[15px] text-muted">
            Bu telefonda narxlar allaqachon yangilandi. Boshqalarga 1–2 daqiqada ko’rinadi.
          </p>
          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setPhase('edit')}
              className="rounded-2xl border border-line px-5 py-3.5 font-bold transition active:scale-[.98]"
            >
              Yana o’zgartirish
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-brand rounded-2xl px-5 py-3.5 font-bold text-white transition active:scale-[.98]"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </Sheet>
  )
}
