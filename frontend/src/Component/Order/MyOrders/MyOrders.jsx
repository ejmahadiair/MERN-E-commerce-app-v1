import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  getOrderDetails,
  myOrders,
} from "../../../actions/orderAction";
import { useNavigate } from "react-router-dom";
import "./myOrders.scss";
import Loader from "../../loader/Loader";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const alert = useAlert();
  const navigate = useNavigate();

  const orderDetailsHandler = (id) => {
    dispatch(getOrderDetails(id));
    navigate(`/order/${id}`);
  };
  useEffect(() => {
    dispatch(myOrders());
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [alert, dispatch, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="my-orders-container">
            {orders ? (
              <>
                {orders.map((order) => {
                  return (
                    <div key={order._id} className="my-orders">
                      <div className="order-top">
                        <div className="order-left">
                          <div className="order-time">
                            <p className="order-id">
                              Order Id:{" "}
                              <p
                                className="id"
                                onClick={() => orderDetailsHandler(order._id)}
                              >
                                {order._id}
                              </p>
                            </p>
                            <p className="order-palce">
                              {`Place On ${order.createdAt.slice(0, 10)}`}
                            </p>
                          </div>
                        </div>
                        <div className="order-right">
                          <p
                            className="link"
                            onClick={() => orderDetailsHandler(order._id)}
                          >
                            MANAGE
                          </p>
                        </div>
                      </div>
                      <div className="hr-line"></div>
                      <div className="order-bottom">
                        <div className="order-image">
                          <img src={order.orderItem[0].image} alt="" />
                        </div>
                        <p className="order-name">{order.orderItem[0].name}</p>
                        <div className="order-quantity">
                          <p className="qty">Qty</p>
                          <p className="order-qty">
                            {order.orderItem[0].quantity}
                          </p>
                        </div>
                        <p className="order-status">{order.orderStatus}</p>
                        {order.deliveredAt && (
                          <>
                            <p className="order-deliverd-on">
                              `Delivered on {order.deliveredAt.slice(0, 10)}`
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="no-order">
                  <h1>You did not order yet</h1>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MyOrders;
