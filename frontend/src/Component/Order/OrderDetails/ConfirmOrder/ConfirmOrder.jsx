import React from "react";
import { useSelector } from "react-redux";
import Close from "@material-ui/icons/Close";
import "./confirmOrder.scss";
const ConfirmOrder = ({ setConfirmOrder, setPayment }) => {
  const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.addToCart);
  const { product } = useSelector((state) => state.productDetails);
  const subtotal = localStorage.getItem("quantity") * product.price;
  const totalPrice = localStorage.getItem("quantity") * product.price + 10;

  const proceedToPay = () => {
    sessionStorage.setItem("Costs", JSON.stringify({ subtotal, totalPrice }));
    setConfirmOrder({ select: false, active: true });
    setPayment({ select: true, active: true });
  };
  return (
    <>
      <div className="confirm-order-container">
        <div className="left">
          <h1>Shipping Info</h1>
          <div className="shipping-info">
            <p className="name">
              Name:{"           "}
              <span>{user.name}</span>
            </p>
            <p className="phone">
              Phone:{"          "}
              <span>{shippingInfo.phoneNo}</span>
            </p>
            <p className="address">
              Address:{"            "}
              <span>
                {`${shippingInfo.address} ${shippingInfo.city}, ${shippingInfo.postCode}, ${shippingInfo.state}, ${shippingInfo.country} `}
              </span>
            </p>
          </div>
          <h1>Your Product</h1>
          <div className="shipping-product">
            <div className="shipping-product-img">
              <img src={product.images[0].url} alt="" />
            </div>
            <div className="bref">
              <p className="product-name">{product.name}</p>
              <p className="product-quantity">{`Quentity: ${localStorage.getItem(
                "quantity"
              )}`}</p>
            </div>
            <div className="price-calc">
              <p>{localStorage.getItem("quantity")}</p>
              <p>
                <Close />
              </p>
              <p>${product.price}</p>
              <p>=</p>
              <p>${subtotal}</p>
            </div>
          </div>
        </div>
        <div className="break-like"></div>
        <div className="right">
          <div className="right-block">
            <h2>Order Summery</h2>
            <div className="hr-line"></div>
            <div className="total-price">
              <div className="price-box">
                <p>SubTotal:</p>
                <p>${subtotal}</p>
              </div>
              <div className="price-box">
                <p>Shipping Charge:</p>
                <p>$10</p>
              </div>
            </div>
            <div className="hr-line"></div>
            <div className="In-Total">
              <p>Total:</p>
              <p>{totalPrice}</p>
            </div>

            <button className="button-design-tomato" onClick={proceedToPay}>
              Proceed TO Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
