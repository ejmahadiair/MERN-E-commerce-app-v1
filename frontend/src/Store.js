import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  categoryOnOffReducer,
  getAllProductReducer,
  newProductReducer,
  productDeleteReducer,
  productDetailReducer,
  productReducer,
} from "./reducers/ProductReducer";
import {
  forgotPassworReducer,
  getAllUsersReducer,
  profileReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  getAllOrdersReducer,
  myOrderReducer,
  newOrderRequest,
  orderDetailsReducer,
} from "./reducers/orderReducer";
import { newReviewReducer } from "./reducers/reviewReducer";

const reducer = combineReducers({
  products: productReducer,
  getProducts: getAllProductReducer,
  newProduct: newProductReducer,
  productDetails: productDetailReducer,
  deleteProduct: productDeleteReducer,
  categoryOnOff: categoryOnOffReducer,
  user: userReducer,
  getAllUsers: getAllUsersReducer,
  updateUser: profileReducer,
  forgotPassword: forgotPassworReducer,
  addToCart: cartReducer,
  newOrder: newOrderRequest,
  myOrders: myOrderReducer,
  getAllOrders: getAllOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
});

let initialState = {
  addToCart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
