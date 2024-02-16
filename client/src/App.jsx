import { useContext, useState } from 'react'
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
import { userContext } from './context/userContext'
function App() {

  const { isLoginOpen } = useContext(userContext)

  const [loading, setLoading] = useState(true)

  return (
    <><Toaster
      position="top-left"
      reverseOrder={false}
    />
      {isLoginOpen ? <Login /> : null}
      <Routes>
        <Route element={<MainLayout loading={loading} setLoading={setLoading} />}>
          <Route path="/" element={<HomePage loading={loading} setLoading={setLoading} />} />
          <Route element={<PrivateRoute check={["user", "admin"]} />}>
            <Route path="/contact" element={<Contact loading={loading} setLoading={setLoading} />} />
            <Route path="/cart" element={<Cart loading={loading} setLoading={setLoading} />} />
            <Route path="/wishlist" element={<Wishlist loading={loading} setLoading={setLoading} />} />
          </Route>
          <Route element={<PrivateRoute check={["admin"]} />}>
            {/* <Route path="/admin" element={<Admin />} /> */}
          </Route>
          <Route path="/shop" element={<Shop loading={loading} setLoading={setLoading} />} />
          <Route path="/about" element={<About loading={loading} setLoading={setLoading} />} />
          <Route path="/blog" element={<Blog loading={loading} setLoading={setLoading} />} />
          <Route path="/details/:id" element={<Details loading={loading} setLoading={setLoading} />} />
        </Route>
        <Route path="/checkout" element={<CheckOut loading={loading} setLoading={setLoading} />} />
      </Routes>
    </>
  )
}

export default App
