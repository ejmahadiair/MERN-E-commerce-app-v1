import React from "react";
import { Link } from "react-router-dom";
import {
  DoubleArrow,
  Dashboard,
  DoneAll,
  Create,
  TripOrigin,
  VerifiedUser,
  Comment,
} from "@material-ui/icons";
import "./panalOptions.scss";
import { useState } from "react";
const PanalOptions = () => {
  const [adminToggle, setAdminToggle] = useState(false);

  const clickOff = () => {
    const w = window.innerWidth;
    if (w < 850) {
      setAdminToggle(false);
    }
  };
  return (
    <>
      <div className="panal-option-container">
        <div className="logo">
          <h1>EJ E-Commerce</h1>
          <div className="toggle" onClick={() => setAdminToggle(!adminToggle)}>
            <DoubleArrow />
          </div>
        </div>
        <ul className={adminToggle ? "ulOpen" : ""}>
          <li>
            <Dashboard />
            <Link className="link" to="/admin/dashboard" onClick={clickOff}>
              Dashboard
            </Link>
          </li>
          <li>
            <DoneAll />
            <Link className="link" to="/admin/products" onClick={clickOff}>
              All Products
            </Link>
          </li>
          <li>
            <Create />
            <Link className="link" to="/admin/create" onClick={clickOff}>
              Create Product
            </Link>
          </li>
          <li>
            <TripOrigin />
            <Link className="link" to="/admin/orders" onClick={clickOff}>
              Orders
            </Link>
          </li>
          <li>
            <VerifiedUser />
            <Link className="link" to="/admin/users" onClick={clickOff}>
              Users
            </Link>
          </li>
          <li>
            <Comment />
            <Link className="link" to="/admin/reviews" onClick={clickOff}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PanalOptions;
