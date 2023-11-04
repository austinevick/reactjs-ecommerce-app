import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { HomePage } from './pages/HomePage.tsx'
import { ProductPage } from './pages/ProductPage.tsx'
import App from './App.tsx'
import axios from 'axios'
import './index.css'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path='product/:slug' element={<ProductPage />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
