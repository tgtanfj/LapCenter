import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Intro from './pages/intro'
import Contact from './pages/contact'
import ProductDetail from './pages/product-detail'
import Login from './pages/login'
import Register from './pages/register'
import PageNotFound from './pages/page-not-found'
import Buy from './pages/buy'
import MyCart from './pages/my-cart'

function App() {
  const name = localStorage.getItem('name')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/buy" element={<Buy />} />
        {localStorage.getItem('name') && <Route path="/cart" element={<MyCart />} />}
        <Route path="/*" element={<PageNotFound />} />
        {!name &&
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        }

      </Routes>
    </BrowserRouter>
  )
}

export default App