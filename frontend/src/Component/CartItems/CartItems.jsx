import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import "./cartitems.scss";
const CartItems = () => {
  const { cartItems } = useSelector((state) => state.addToCart);
  return (
    <>
      <div className="cart-items-container">
        {cartItems.length !== 0 ? (
          cartItems.map((product) => (
            <CartItem product={product} key={product._id} />
          ))
        ) : (
          <>
            <div className="no-item-cart">
              <h1>No Item added to your cart</h1>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartItems;
