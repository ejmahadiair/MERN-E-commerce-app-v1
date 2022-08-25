import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, resetPassword } from "../../actions/userAction";
import Loader from "../loader/Loader";
import "./resetPassword.scss";
const ResetPassword = () => {
  const [isShow, setIsShow] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const alert = useAlert();
  const params = useParams();
  const token = params.token;
  const navigate = useNavigate();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const dispatch = useDispatch();
  const cancleRestPasswordTab = () => {
    navigate("/account");
  };
  const resetPassHandler = (e) => {
    e.preventDefault();
    if (password.length >= 8 || confirmPassword.length >= 8) {
      dispatch(resetPassword(token, password, confirmPassword));
    } else {
      alert.error("Password must be greater then 7 ");
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password reset successfully");
      navigate("/account");
    }
  }, [alert, dispatch, error, success, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="reset-password-container">
          <div className="reset-password">
            <div
              className="close-resetpass-tab"
              onClick={cancleRestPasswordTab}
            >
              <div className="line line1"></div>
              <div className="line line2"></div>
            </div>
            <h3>Reset Password</h3>
            <form onSubmit={resetPassHandler}>
              <input
                className="input-design-tomato"
                type={isShow ? "text" : "password"}
                placeholder="Enter new Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="input-design-tomato"
                type={isShow ? "text" : "password"}
                placeholder="Enter confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="showpass" onClick={() => setIsShow(!isShow)}>
                Show password
              </div>
              <button type="submit" className="button-design-tomato">
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
