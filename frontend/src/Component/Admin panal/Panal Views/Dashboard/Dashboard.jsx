import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./dashboard.scss";
// import { Chart, ArcElement, CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import { useEffect } from "react";
import { clearError } from "../../../../actions/orderAction";
import { useAlert } from "react-alert";
import Loader from "../../../loader/Loader";
const Dashboard = () => {
  Chart.register();

  const { loading, products, error } = useSelector(
    (state) => state.getProducts
  );
  const { allOrderError, allorders } = useSelector(
    (state) => state.getAllOrders
  );
  const { allusers, allUserError } = useSelector((state) => state.getAllUsers);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (allOrderError) {
      alert.error(allOrderError);
      dispatch(clearError());
    }
    if (allUserError) {
      alert.error(allUserError);
      dispatch(clearError());
    }
  }, [alert, allOrderError, dispatch, error, allUserError]);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  let totalAmounts = 0;
  allorders &&
    allorders.orders.forEach((item) => {
      totalAmounts += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#299647"],
        hoverBackgroundColor: ["#46469e"],
        data: [0, totalAmounts],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#46469e", "#299647"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard-container">
          <h1>Dashboard</h1>
          <div className="total-amount">
            <h2>Total Amount</h2>
            <p>${totalAmounts}</p>
          </div>
          <div className="item-summary">
            <div className="products item">
              <h3>Products</h3>
              <p>{products.length}</p>
            </div>
            <div className="Orders item">
              <h3>Orders</h3>
              <p>{allorders.orders.length}</p>
            </div>
            <div className="Users item">
              <h3>Users</h3>
              <p>{allusers.user.length}</p>
            </div>
          </div>
          <div className="chart-view">
            <div className="line-chart">
              <Line data={lineState} />
            </div>
            <div className="doughnutChart">
              <Doughnut data={doughnutState} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
