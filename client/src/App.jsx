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
import Error from './pages/Error'
function App() {

  const { isLoginOpen } = useContext(userContext)

  const [pageLoading, setPageLoading] = useState(true)

  return (
    <><Toaster
      position="top-left"
      reverseOrder={false}
    />
      {isLoginOpen ? <Login /> : null}
      <Routes>
        <Route path="*" element={<Error />} />
        <Route element={<MainLayout pageLoading={pageLoading} setPageLoading={setPageLoading} />}>
          <Route path="/" element={<HomePage pageLoading={pageLoading} setPageLoading={setPageLoading} />} />
          <Route element={<PrivateRoute check={["user", "admin"]} />}>
            <Route path="/contact" element={<Contact pageLoading={pageLoading} setPageLoading={setPageLoading} />} />
            <Route path="/cart" element={<Cart pageLoading={pageLoading} setPageLoading={setPageLoading} />} />
            <Route path="/wishlist" element={<Wishlist pageLoading={pageLoading} setPageLoading={setPageLoading} />} />
          </Route>
          <Route element={<PrivateRoute check={["admin"]} />}>
            {/* <Route path="/admin" element={<Admin />} /> */}
          </Route>
          <Route path="/shop" element={<Shop pageLoading={pageLoading} setPageLoading={setPageLoading} />} />
          <Route path="/about" element={<About pageLoading={pageLoading} setPageLoading={setPageLoading} />} />
          <Route path="/blog" element={<Blog pageLoading={pageLoading} setPageLoading={setPageLoading} />} />
          <Route path="/details/:id" element={<Details pageLoading={pageLoading} setPageLoading={setPageLoading} />} />
        </Route>
        <Route path="/checkout" element={<CheckOut pageLoading={pageLoading} setPageLoading={setPageLoading} />} />
      </Routes>
    </>
  )
}

export default App
