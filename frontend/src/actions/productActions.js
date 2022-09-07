import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERROR,
  CATEGORY_ON,
  CATEGORY_OFF,
  JUST_ALL_PRODUCT_FAIL,
  JUST_ALL_PRODUCT_REQUEST,
  JUST_ALL_PRODUCT_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
} from "../constants/productConstant";

export const getProduct =
  (
    keyword = "",
    currentPage = 1,
    price = [0, Number.POSITIVE_INFINITY],
    category,
    ratings = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const res = await axios.get(link);
      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.message,
      });
    }
  };

//Get Just all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: JUST_ALL_PRODUCT_REQUEST });

    const res = await axios.get(`/api/v1/all/products`);
    dispatch({ type: JUST_ALL_PRODUCT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: JUST_ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
//create new product
export const createNewProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/v1/admin/product/new`, product, config);
    dispatch({ type: NEW_PRODUCT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: NEW_PRODUCT_FAIL, payload: error.response.data.message });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const res = await axios.get(`/api/v1/product/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    const res = await axios.delete(`/api/v1/admin/product/${id}`);
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const categoryOn = () => {
  return {
    type: CATEGORY_ON,
  };
};
export const categoryOff = () => {
  return {
    type: CATEGORY_OFF,
  };
};
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
