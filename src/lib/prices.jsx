import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { asset } from './util.js'

/* Narxlar public/prices.json dan har ochilganda yangidan olinadi (kesh chetlab o'tiladi).
   Oxirgi olingani localStorage'da turadi: internet sust bo'lsa ham darhol ko'rinadi.
   Admin saqlaganda o'z telefonida darhol yangilanadi (deploy tugashini kutmasdan). */

const CACHE_KEY = 'shahzod-prices'
const PricesContext = createContext(null)

function readCache() {
  try {
    const data = JSON.parse(localStorage.getItem(CACHE_KEY))
    return data?.groups ? data : null
  } catch {
    return null
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch {
    /* xotira to'la yoki yopiq rejim — muhim emas */
  }
}

const time = (data) => Date.parse(data?.updatedAt) || 0

export function PricesProvider({ children }) {
  const [state, setState] = useState(() => {
    const cached = readCache()
    return cached ? { status: 'ready', data: cached } : { status: 'loading', data: null }
  })

  useEffect(() => {
    let alive = true
    fetch(`${asset('prices.json')}?v=${Date.now()}`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((remote) => {
        if (!alive || !remote?.groups) return
        setState((prev) => {
          /* Admin hozirgina saqlagan bo'lsa, deploy tugaguncha serverdagisi eskiroq bo'ladi */
          if (prev.data && time(prev.data) > time(remote)) return prev
          writeCache(remote)
          return { status: 'ready', data: remote }
        })
      })
      .catch(() => {
        if (alive) setState((prev) => (prev.data ? prev : { status: 'error', data: null }))
      })
    return () => {
      alive = false
    }
  }, [])

  const applyLocal = useCallback((data) => {
    writeCache(data)
    setState({ status: 'ready', data })
  }, [])

  return <PricesContext.Provider value={{ ...state, applyLocal }}>{children}</PricesContext.Provider>
}

export const usePrices = () => useContext(PricesContext)
