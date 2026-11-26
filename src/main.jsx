import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import { PricesProvider } from './lib/prices.jsx'
import HomePage from './pages/HomePage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import './index.css'

/* HashRouter: GitHub Pages'da sahifa yangilanganda 404 bo'lmaydi */
const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'mahsulotlar', element: <ProductsPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PricesProvider>
      <RouterProvider router={router} />
    </PricesProvider>
  </StrictMode>,
)
