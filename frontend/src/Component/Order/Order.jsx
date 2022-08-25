import React, { useState, useEffect } from "react";
import LocalShippingOutlined from "@material-ui/icons/LocalShippingOutlined";
import Check from "@material-ui/icons/Check";
import Paymenticon from "@material-ui/icons/PaymentOutlined";
import "./order.scss";
import ShippingInfo from "./OrderDetails/ShippingInfo/ShippingInfo";
import ConfirmOrder from "./OrderDetails/ConfirmOrder/ConfirmOrder";
import Payment from "./OrderDetails/Payment/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const Order = () => {
  const [shippingDetails, setShippingDetails] = useState({
    select: true,
    active: true,
  });
  const [confirmOrder, setConfirmOrder] = useState({
    select: false,
    active: false,
  });
  const [payment, setPayment] = useState({ select: false, active: false });
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    getStripeApiKey();
  }, []);
  console.log("api key: ", stripeApiKey);
  return (
    <>
      <div className="order-container">
        <div className="shiping-log-container">
          <div
            className={
              shippingDetails.active
                ? "shipping item active-log"
                : "shipping item"
            }
          >
            <LocalShippingOutlined />
            <p>Shipping Details</p>
          </div>
          <div className="hr-line"></div>
          <div
            className={
              confirmOrder.active
                ? "confirm-order item active-log"
                : "confirm-order item"
            }
          >
            <Check />
            <p>Confirm Order</p>
          </div>
          <div className="hr-line"></div>
          <div
            className={
              payment.active ? "Payment item active-log" : "Payment item"
            }
          >
            <Paymenticon />
            <p>Payment</p>
          </div>
        </div>
        {shippingDetails.select && (
          <div className="shipping-container">
            <ShippingInfo
              setShippingDetails={setShippingDetails}
              setConfirmOrder={setConfirmOrder}
            />
          </div>
        )}
        {confirmOrder.select && (
          <div className="order-confirm-container">
            <ConfirmOrder
              setConfirmOrder={setConfirmOrder}
              setPayment={setPayment}
            />
          </div>
        )}
        {payment.select && (
          <div className="peyment-process-container">
            {stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Order;
