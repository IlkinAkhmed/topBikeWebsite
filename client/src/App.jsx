import { useState } from 'react'
import { Toaster } from "react-hot-toast"
import { Route, Routes } from 'react-router'
import './App.css'
import Details from './components/Details'
import Login from './components/login'
import MainLayout from './layouts/MainLayout'
import About from './pages/About'
import Blog from './pages/Blog'
import Cart from './pages/CartPage'
import Contact from './pages/Contact'
import HomePage from './pages/HomePage/HomePage'
import Shop from './pages/Shop'
import Wishlist from './pages/WishlistPage'
import CheckOut from './pages/checkoutPage'
import PrivateRoute from './routes/privateRoute'
function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  return (
    <><Toaster
      position="top-left"
      reverseOrder={false}
    />
      {isLoginOpen ? <Login isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} /> : null}
      <Routes>
        <Route element={<MainLayout isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />}>
          <Route path="/" element={<HomePage />} />
          <Route element={<PrivateRoute isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} check={["user", "admin"]} />}>
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
          <Route element={<PrivateRoute check={["admin"]} />}>
            {/* <Route path="/admin" element={<Admin />} /> */}
          </Route>
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/details/:id" element={<Details />} />
        </Route>
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
    </>
  )
}

export default App
