import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./updateProduct.scss";
import {
  clearError,
  createNewProduct,
  getProductDetails,
} from "../../../../actions/productActions";
import Loader from "../../../loader/Loader";
import { useParams } from "react-router-dom";
const UpdateProduct = () => {
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  console.log("product: ", product);
  const catagory = [
    "T-Shirt",
    "MobilePhone",
    "Electronics",
    "Grocery",
    "Cloths",
    "Laptops",
  ];
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagePreview, setIamgePreview] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (product && product._id !== params.id) {
      dispatch(getProductDetails(params.id));
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setDescription(product.description);
      setOldImages(product.images);
    } else {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setDescription(product.description);
      setOldImages(product.images);
    }
  }, [dispatch, params.id, alert, error, product]);

  const imageChange = (e) => {
    const file = Array.from(e.target.files);
    setImages([]);
    setIamgePreview([]);
    file.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
          setIamgePreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const submitNewProduct = (e) => {
    e.preventDefault();
    // const myForm = new FormData();
    // myForm.set("name", name);
    // myForm.set("price", price);
    // myForm.set("description", description);
    // myForm.set("category", category);
    // myForm.set("Stock", Stock);

    // images.forEach((image) => {
    //   myForm.append("images", image);
    // });

    // dispatch(createNewProduct(myForm));

    // setName("");
    // setPrice("");
    // setCategory("");
    // setStock(1);
    // setDescription("");
    // setImages([]);
    // setIamgePreview([]);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="update-product-container">
          <form onSubmit={submitNewProduct}>
            <input
              className="fild-style"
              type="text"
              placeholder="Enter Product Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="fild-style"
              type="text"
              placeholder="Enter Product Price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <select
              className="fild-style"
              name="catagory"
              id="catagory"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Select Catagory">Select Catagory</option>
              {catagory &&
                catagory.map((item, index) => {
                  return <option key={index}>{item}</option>;
                })}
            </select>
            <input
              className="fild-style"
              type="number"
              placeholder="Available Stocks"
              required
              value={Stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <textarea
              className="fild-style"
              name="description"
              id="description"
              cols="20"
              rows="10"
              placeholder="Write some description about your product"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label htmlFor="img">
              <input
                type="file"
                name="productImg"
                accept="image/*"
                multiple
                required
                onChange={imageChange}
              />
            </label>
            {imagePreview.length > 0 && (
              <div className="image-preview">
                {imagePreview &&
                  imagePreview.map((img, index) => {
                    return (
                      <div key={index} className="image">
                        <img src={img} alt="product-view" />
                      </div>
                    );
                  })}
              </div>
            )}

            <input
              className="fild-style submit-button"
              type="submit"
              value="Create New Product"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
