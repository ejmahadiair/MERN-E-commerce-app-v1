import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import store from "./Store";
import "./app.scss";
import Footer from "./Component/Footer/Footer";
import Header from "./Component/Header/Header";
import Home from "./Component/Home/Home";
import ProductDetails from "./Component/productDetails/ProductDetails";
import Products from "./Component/Products/Products";
import Account from "./Component/User/Account";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./Component/UserOptions/UserOptions";
import Profile from "./Component/userAccount/Profile";
import ProtectedRoute from "./Component/Route/ProtectedRoute";
import Forgotpass from "./Component/Forgot/Forgotpass";
import ResetPassword from "./Component/ResetPassword/ResetPassword";
import CartItems from "./Component/CartItems/CartItems";
import Order from "./Component/Order/Order";
import PaymentSuccess from "./Component/Order/PaymentSuccess/PaymentSuccess";
import MyOrders from "./Component/Order/MyOrders/MyOrders";
import OrderDetails from "./Component/Order/A OrderDetails/OrderDetails";
import AdminProtectedRoute from "./Component/Route/AdminProtectedRoute";
import Panal from "./Component/Admin panal/Panal";
import Dashboard from "./Component/Admin panal/Panal Views/Dashboard/Dashboard";
import AllProducts from "./Component/Admin panal/Panal Views/AllPorducts/AllProducts";
import CreateProduct from "./Component/Admin panal/Panal Views/CreateProduct/CreateProduct";
import Orders from "./Component/Admin panal/Panal Views/orders/Orders";
import Users from "./Component/Admin panal/Panal Views/Users/Users";
import Reviews from "./Component/Admin panal/Panal Views/Reviews/Reviews";
import UpdateProduct from "./Component/Admin panal/Panal Views/Update Product/UpdateProduct";
export const accountContext = createContext();
function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  //Login signup control
  const [isAccount, setIsAccount] = useState(true);
  //

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <accountContext.Provider value={setIsAccount}>
      <div className="appContainer">
        <Header setIsAccount={setIsAccount} />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route
            path="/account"
            element={
              <Account isAcounnt={isAccount} setIsAccount={setIsAccount} />
            }
          />
          <Route path="/forgotpass" element={<Forgotpass />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/userAccount" element={<Profile />} />
            <Route path="/carts" element={<CartItems />} />
            <Route path="/order" element={<Order />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/orders" element={<MyOrders />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/order/:id" element={<OrderDetails />} />
          </Route>
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<Panal />}>
              <Route index element={<Dashboard />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<AllProducts />} />
              <Route path="/admin/create" element={<CreateProduct />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/reviews" element={<Reviews />} />
              <Route path="/admin/product/:id" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </div>
    </accountContext.Provider>
  );
}

export default App;
