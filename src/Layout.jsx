import { useCallback, useState } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import AdminPanel from './components/AdminPanel.jsx'
import BottomBar from './components/BottomBar.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'

export default function Layout() {
  const [admin, setAdmin] = useState(false)
  const openAdmin = useCallback(() => setAdmin(true), [])
  const closeAdmin = useCallback(() => setAdmin(false), [])

  return (
    <>
      <Header />
      <main className="min-h-dvh">
        <Outlet />
      </main>
      <Footer onSecret={openAdmin} />
      <BottomBar />
      <AdminPanel open={admin} onClose={closeAdmin} />
      <ScrollRestoration />
    </>
  )
}
