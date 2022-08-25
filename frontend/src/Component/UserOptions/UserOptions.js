import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOutUser } from "../../actions/userAction";
import UserOptionSetting from "../../Icons/user-icons/user-options4.svg";
import "./userOptions.scss";
const UserOptions = () => {
  const [optionOnOff, setOptionOnOff] = useState(false);

  //user control
  const { user } = useSelector((state) => state.user);
  //
  //logut activatis
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(logOutUser());
  };
  //
  return (
    <>
      <div
        className={
          optionOnOff
            ? "user-options-container user-options-container-on"
            : "user-options-container"
        }
      >
        <div className="profile-photo">
          <img src={user.avatar.url} alt="profile" />
        </div>
        <div className="option-box">
          <ul>
            {user.role === "admin" && (
              <li>
                <Link to="/admin" className="option-item">
                  Admin Panal
                </Link>
              </li>
            )}
            <li>
              <Link to="/orders" className="option-item">
                Orders
              </Link>
            </li>
            <li>
              <Link to="/userAccount" className="option-item">
                My Account
              </Link>
            </li>
            <li>
              <Link to="/carts" className="option-item">
                Carts
              </Link>
            </li>
            <li>
              <Link to="/" className="option-item" onClick={logOutHandler}>
                Log Out
              </Link>
            </li>
          </ul>
        </div>
        <div
          className="OnOff-option-box"
          onClick={() => setOptionOnOff(!optionOnOff)}
        >
          <div className="user-option-setting-box">
            <img src={UserOptionSetting} alt="" className="option-setting" />
            <div className="profile-option">
              <img src={user.avatar.url} alt="option toggle" />
            </div>
          </div>
        </div>
      </div>
      {optionOnOff && (
        <div
          className="cover-on-off"
          onClick={() => setOptionOnOff(false)}
        ></div>
      )}
    </>
  );
};

export default UserOptions;
