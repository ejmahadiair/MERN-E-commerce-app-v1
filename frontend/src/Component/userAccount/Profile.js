import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import MetaData from "../MetaData";
import {
  clearErrors,
  loadUser,
  UpadateUserDetails,
  UpdateUserPassword,
} from "../../actions/userAction";
import "./profile.scss";
// import uploadImage from "../../Icons/user-icons/upload-photo.svg";
import {
  PASSWROD_UPDATE_RESET,
  USER_UPDATE_RESET,
} from "../../constants/userConstant";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useAlert } from "react-alert";
import MyReviews from "../Reviews/My Reviews/MyReviews";
const Profile = () => {
  //get user data
  const { loading, user } = useSelector((state) => state.user);
  const { error, isUpdated, Updateloading } = useSelector(
    (state) => state.updateUser
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  //
  const navigate = useNavigate();
  //control the profile options
  const [profileOption, setProfileOption] = useState("my-profile");
  //
  //edit profile
  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const EditProfileHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", newName);
    myForm.set("email", newEmail);
    myForm.set("avatar", avatar);
    dispatch(UpadateUserDetails(myForm));
  };
  const updateProfileChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setNewName(user.name);
      setNewEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      dispatch({
        type: USER_UPDATE_RESET,
      });
      dispatch({
        type: PASSWROD_UPDATE_RESET,
      });
    }
    if (isUpdated) {
      alert.success("Update successfull");
      dispatch(loadUser());
      navigate("/userAccount");

      dispatch({
        type: USER_UPDATE_RESET,
      });
      dispatch({
        type: PASSWROD_UPDATE_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate, user, alert]);
  //
  //edit password
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [conNewPass, setConNewPass] = useState("");
  const [ishow, setIsShow] = useState(false);
  const EditPasswordHandler = (e) => {
    e.preventDefault();
    if (newPass.length >= 8 && conNewPass.length >= 8) {
      dispatch(UpdateUserPassword(oldPass, newPass, conNewPass));
    } else {
      alert.error(
        "Your Old Password is incorrect or Password Should have more the than or equal to 8 characters"
      );
    }
  };
  //
  //for all option toggle button design
  const [allOptionToggle, setAllOptionToggle] = useState(false);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}'s Account`} />
          <div className="profile-container">
            <div className="profile-left-container">
              <div className="profile-left">
                <div
                  className="button-design-tomato all-option-toggle"
                  onClick={() => setAllOptionToggle(!allOptionToggle)}
                >
                  All Account options
                </div>
                <div className="profile-control-buttons">
                  <button
                    className="profile-select-view"
                    onClick={() => setProfileOption("my-profile")}
                  >
                    My Profile
                  </button>
                  <button
                    className="profile-select-view"
                    onClick={() => setProfileOption("edit-profile")}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="profile-select-view"
                    onClick={() => setProfileOption("edit-password")}
                  >
                    Change Password
                  </button>
                  <button
                    className="profile-select-view"
                    onClick={() => navigate("/orders")}
                  >
                    My Orders
                  </button>
                  <button
                    className="profile-select-view"
                    onClick={() => navigate("/carts")}
                  >
                    My Carts
                  </button>
                  <button
                    to="/carts"
                    className="profile-select-view"
                    onClick={() => setProfileOption("reviews")}
                  >
                    My Reviews
                  </button>
                </div>
              </div>
            </div>
            <div className="profile-right">
              <div className="profile-control-views">
                {profileOption === "my-profile" && (
                  <div className="profile-view">
                    <div className="profile-view-left">
                      <div className="profile-name profile-detail">
                        <h3 className="profile-view-tags">Full Name</h3>
                        <p className="tag-text">{user.name}</p>
                      </div>
                      <div className="profile-email profile-detail">
                        <h3 className="profile-view-tags">Email Address</h3>
                        <p className="tag-text">{user.email}</p>
                      </div>
                      <div className="profile-createdAt profile-detail">
                        <h3 className="profile-view-tags">Join from</h3>
                        <p className="tag-text">
                          {String(user.createdAt).substring(0, 10)}
                        </p>
                      </div>
                    </div>
                    <div className="profile-view-right">
                      <div className="profile-view-image">
                        <img
                          src={user.avatar.url}
                          alt={`${user.name}'s profile`}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* edit profile from here */}
                {profileOption === "edit-profile" && (
                  <div className="edit-profile-view">
                    <form onSubmit={EditProfileHandler}>
                      <div className="edit-profile-image">
                        <label className="upload-new-photo" htmlFor="input-tag">
                          <img src={avatarPreview} alt="" />
                          <p>Upload New Photo</p>
                          <input
                            id="input-tag"
                            name="avatar"
                            type="file"
                            accept="image/*"
                            onChange={updateProfileChange}
                          />
                        </label>
                      </div>
                      <div className="edit-profile-detail">
                        <div className="edit-profile-name edit-profile-field">
                          <div className="edit-profile-input-tag">
                            Edit Your Name
                          </div>
                          <input
                            className="edit-profile-input input-design-tomato"
                            type="text"
                            name="name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="edit-profile-email edit-profile-field">
                          <div className="edit-profile-input-tag">
                            Edit Your Email
                          </div>
                          <input
                            className="edit-profile-input input-design-tomato"
                            type="email"
                            name="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="update-edited-profile button-design-tomato"
                      >
                        Update Profile
                      </button>
                    </form>
                    {Updateloading && (
                      <h1>Please Wait your profile is Updating</h1>
                    )}
                  </div>
                )}
                {profileOption === "edit-password" && (
                  <div className="edit-password-view">
                    <form onSubmit={EditPasswordHandler}>
                      <div className="old-pass-field">
                        <input
                          className="input-design-tomato"
                          type={ishow ? "text" : "password"}
                          placeholder="Input Old Password"
                          required
                          value={oldPass}
                          onChange={(e) => setOldPass(e.target.value)}
                        />
                        <div
                          className="update-pass-vissivility"
                          onClick={() => setIsShow(!ishow)}
                        >
                          {ishow ? <Visibility /> : <VisibilityOff />}
                        </div>
                      </div>
                      <div className="new-pass-field">
                        <input
                          className="input-design-tomato"
                          type={ishow ? "text" : "password"}
                          placeholder="Input new password"
                          required
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                        />
                        <input
                          className="input-design-tomato"
                          type={ishow ? "text" : "password"}
                          placeholder="Confirm new Password"
                          required
                          value={conNewPass}
                          onChange={(e) => setConNewPass(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="button-design-tomato">
                        Update Password
                      </button>
                    </form>
                  </div>
                )}
                {/* {profileOption === "my-orders" && (
                  <div className="my-orders-view">my-orders-view</div>
                )}

                {profileOption === "my-carts" && (
                  <div className="my-carts-view">my-carts-view</div>
                )} */}
                {profileOption === "reviews" && (
                  <div className="my-reviews-view">
                    <MyReviews />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
