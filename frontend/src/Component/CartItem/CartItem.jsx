import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItemsFromCart } from "../../actions/cartAction";
import "./cartItem.scss";
const CartItem = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //product details control
  const itemDetailsHandler = () => {
    navigate(`/product/${product._id}`);
  };

  const removeItem = () => {
    dispatch(removeItemsFromCart(product._id));
  };

  //
  return (
    <>
      <div className="cart-item-container">
        <div className="cart-image-container">
          <img src={product.images[0].url} alt="" />
        </div>
        <div className="cart-item">
          <p>
            <span>Product Id:</span> {product._id}
          </p>
          <h1>{product.name}</h1>
          <h2>{`$${product.price}`}</h2>
        </div>
        <div className="cart-button-container">
          <button className="button-design-tomato" onClick={itemDetailsHandler}>
            Detais
          </button>
          <button className="button-design-tomato" onClick={removeItem}>
            Remove
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
