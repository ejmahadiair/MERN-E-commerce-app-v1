import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./allProducts.scss";
import { useEffect } from "react";
import {
  clearError,
  getAllProducts,
  deleteProduct,
} from "../../../../actions/productActions";
import Loader from "../../../loader/Loader";
import { PRODUCT_DELETE_RESET } from "../../../../constants/productConstant";
const AllProducts = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.getProducts
  );
  const { success, deleteError, deletedProduct } = useSelector(
    (state) => state.deleteProduct
  );
  const alert = useAlert();
  const navigate = useNavigate();

  const deleteProductAdmin = (id) => {
    dispatch(deleteProduct(id));
    alert.show("Product Deleting");
  };

  useEffect(() => {
    dispatch(getAllProducts());
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }
    if (success && deletedProduct) {
      alert.success(deletedProduct.product.name + " deleted successfully");
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
  }, [alert, dispatch, error, success, deleteError, deletedProduct]);
  return (
    <>
      <div className="all-products-container">
        <h1>All products</h1>
        {loading ? (
          <Loader />
        ) : (
          <div className="products-container">
            <div className="head-style">
              <p>Product ID</p>
              <p>Name</p>
              <p>Image</p>
              <p>Stock</p>
              <p>Price</p>
              <p>Action</p>
            </div>
            {products &&
              products.map((product) => {
                return (
                  <div key={product._id} className="product">
                    <p>{product._id}</p>
                    <p>{product.name}</p>
                    <img src={product.images[0].url} alt={product.name} />
                    <p>{product.Stock}</p>
                    <p>{product.price}</p>
                    <div className="product-action-conatiner">
                      <button
                        className="edit button"
                        onClick={() =>
                          navigate(`/admin/product/${product._id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className={`delete button`}
                        onClick={() => deleteProductAdmin(product._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default AllProducts;
