import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./forgotpass.scss";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useEffect } from "react";
import Loader from "../loader/Loader";
const Forgotpass = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const cancleRestPasswordTab = () => {
    navigate("/account");
  };
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const forgotpassHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [alert, dispatch, error, message]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div class="forgotpass-container">
          <div className="forgotpass">
            <div
              className="close-forgotpass-tab"
              onClick={cancleRestPasswordTab}
            >
              <div className="line line1"></div>
              <div className="line line2"></div>
            </div>
            <div className="text-container">
              <h3 className="logo">EJ E-Commers</h3>
              <h1 className="text-tag">Reset Your Password</h1>
            </div>
            <form onSubmit={forgotpassHandler}>
              <input
                type="email"
                placeholder="Enter your Email address"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="message">
                If you did found any email in your mail address please check it
                out in your spam box. If you are not able to click the link then
                please select and copy the link and past it in your borwser
                address box and go to the link.
              </p>
              <button type="submit">Reset Password</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Forgotpass;
