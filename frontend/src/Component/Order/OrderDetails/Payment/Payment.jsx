import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import axios from "axios";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./payment.scss";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearError, createOrder } from "../../../../actions/orderAction";
const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.addToCart);
  const { product } = useSelector((state) => state.productDetails);
  const { error } = useSelector((state) => state.newOrder);
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const paybtn = useRef();
  const cost = JSON.parse(sessionStorage.getItem("Costs"));
  const order = {
    shippingInfo,
    orderItem: {
      name: product.name,
      price: product.price,
      quantity: localStorage.getItem("quantity"),
      image: product.images[0].url,
      product,
    },
    itemsPrice: product.price,
    taxPrice: 0,
    shippingPrice: 10,
    totalPrice: cost.totalPrice,
  };
  const paymentData = {
    amount: cost.totalPrice * 100,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    paybtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.postCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        alert.error(result.error.message);
        paybtn.current.disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          alert.success("Payment successfully done");
          navigate("/payment/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      alert.error(error.response.data.message);
      paybtn.current.disabled = false;
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [alert, error, dispatch]);

  return (
    <>
      <div className="payment-container">
        <h1>Card Info</h1>
        <form onSubmit={submitHandler}>
          <div>
            <CreditCardIcon className="card-payment-icon" />
            <CardNumberElement className="input-design-tomato card-payment" />
          </div>
          <div>
            <EventIcon className="card-payment-icon" />
            <CardCvcElement className="input-design-tomato card-payment" />
          </div>
          <div>
            <VpnKeyIcon className="card-payment-icon" />
            <CardExpiryElement className="input-design-tomato card-payment" />
          </div>
          <input
            className="button-design-tomato"
            type="submit"
            ref={paybtn}
            value={`Pay - $${cost && cost.totalPrice}`}
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
