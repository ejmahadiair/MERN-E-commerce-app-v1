import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearError, getOrderDetails } from "../../../actions/orderAction";
import Loader from "../../loader/Loader";
import "./orderDetails.scss";

const OrderDetails = () => {
  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    dispatch(getOrderDetails(params.id));
  }, [alert, dispatch, error, params.id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="order-details-container">
            <div className="order-details-box">
              <div className="top">
                <div className="left">
                  <div className="details-key">
                    <p
                      className="order-id"
                      onClick={() =>
                        navigate(`/product/${order.orderItem[0].product}`)
                      }
                    >{`Order ID: ${order._id}`}</p>
                    <p className="order-place-time">{`Placed on  ${order.createdAt.slice(
                      0,
                      10
                    )}`}</p>
                  </div>
                </div>
                <div className="right">
                  <p className="total-price">
                    Total: <span>{`$${order.totalPrice}`}</span>
                  </p>
                </div>
              </div>
              <div className="center">
                <div className="order-image">
                  <img src={order.orderItem[0].image} alt="" />
                </div>
                <p className="order-name">{order.orderItem[0].name} </p>
                <p className="order-price">{`$${order.orderItem[0].price}`} </p>
                <div className="quantity">
                  <p className="qty">Qty:</p>
                  <p className="qty-amount">{order.orderItem[0].quantity}</p>
                </div>
                <div className="order-status">
                  <p>{order.orderStatus}</p>
                </div>
                {order.deliveredAt && (
                  <>
                    <div className="delivery-time">
                      {`Delivered on ${order.deliveredAt.slice(0, 10)}`}
                    </div>
                  </>
                )}
                {order.orderStatus === "Processing" && (
                  <>
                    <p className="order-cancle">CANCLE ORDER</p>
                  </>
                )}
              </div>
              <div className="bottom">
                <div className="left">
                  <h2 className="address-tag">Shipping Address</h2>
                  <div className="shipping-info">
                    <p>
                      Name: <span>{order.user.name}</span>
                    </p>
                    <p>
                      Phone-Number: <span>{order.shippingInfo.phoneNo}</span>
                    </p>
                    <p>
                      Address: <span>{order.shippingInfo.address}</span>
                    </p>
                  </div>
                </div>
                <div className="right">
                  <h2>Total Summary</h2>
                  <div className="summary-info">
                    <div className="info">
                      <p>SubTotal</p>
                      <p>{`$${
                        order.itemsPrice * order.orderItem[0].quantity
                      }`}</p>
                    </div>
                    <div className="info">
                      <p>Shipping Fee</p>
                      <p>$10</p>
                    </div>
                    <div className="hr-line"></div>
                    <div className="info">
                      <p>Total</p>
                      <p>{`$${order.totalPrice}`}</p>
                    </div>
                    <div className="info">
                      <p>Paid</p>
                      <p>Paid On: {` ${order.paidAt.slice(0, 10)}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
