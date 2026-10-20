import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx';
import ProductDetails from './pages/productdetails.jsx';
import Cart from './pages/cart.jsx';
import WishList from './pages/wishlist.jsx';
import MyNav from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import AlertBox from './components/alertBox.jsx';
import { useContext } from 'react';
import { StoreContext } from './context/storecontext.jsx';
import Register from './pages/register.jsx';
import LoginModal from './components/loginModal.jsx';
import AdminDashBoard from './pages/adminDashBoard.jsx';

function App() {
  const { dark } = useContext(StoreContext);
  return (

    <div className={` ${dark ? "bg-dark text-light" : "bg-light"}`}>
      <AlertBox />
      <MyNav />
      <LoginModal />
      <Routes>
        <Route path='adminDashboard' element={<AdminDashBoard />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path='/carts/:id' element={<Cart />} />
        <Route path='/wishlist' element={<WishList />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
