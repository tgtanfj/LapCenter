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
import BuyHistorise from './pages/buy-histories'
import Orders from './pages/orders'

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
        {localStorage.getItem('name') && <Route path="/buy-histories" element={<BuyHistorise />} />}
        {localStorage.getItem('name') && localStorage.getItem('isAdmin') === 'true' && <Route path="/orders" element={<Orders />} />}
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