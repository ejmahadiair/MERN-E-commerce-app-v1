import React from "react";
import Check from "@material-ui/icons/Check";
import "./paymentSuccess.scss";
import { useNavigate } from "react-router-dom";
const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="payment-success-container">
        <div className="payment-done item">
          <Check />
        </div>
        <h1 className="item">Your Order has been Placed successfully</h1>
        <button className="item" onClick={() => navigate("/orders")}>
          View Order
        </button>
      </div>
    </>
  );
};

export default PaymentSuccess;
