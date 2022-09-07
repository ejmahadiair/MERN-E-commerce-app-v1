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
  JUST_ALL_PRODUCT_REQUEST,
  JUST_ALL_PRODUCT_SUCCESS,
  JUST_ALL_PRODUCT_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_RESET,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
} from "../constants/productConstant";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productCount,
        resultPerPage: action.payload.resultPerPage,
        filterProductCount: action.payload.filterProductCount,
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Just get all products
export const getAllProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case JUST_ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case JUST_ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      };
    case JUST_ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//create new product
export const newProductReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        success: true,
      };
    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case NEW_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        product: null,
        error: null,
        success: false,
      };

    default:
      return state;
  }
};

export const productDetailReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload.product,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//PRODUCT DELETE REDUCER
export const productDeleteReducer = (
  state = { deletedProduct: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        deleteLoading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        deleteLoading: false,
        deletedProduct: action.payload,
        success: true,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        deleteLoading: false,
        deletedProduct: {},
        deleteError: action.payload,
      };
    case PRODUCT_DELETE_RESET:
      return {
        deleteLoading: false,
        deletedProduct: {},
        deleteError: null,
        success: false,
      };

    default:
      return state;
  }
};

export const categoryOnOffReducer = (state = { filter: false }, action) => {
  switch (action.type) {
    case CATEGORY_ON:
      return {
        ...state,
        filter: true,
      };
    case CATEGORY_OFF:
      return {
        ...state,
        filter: false,
      };

    default:
      return state;
  }
};
