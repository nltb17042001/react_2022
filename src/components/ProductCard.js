import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct } from "../api/productAPI";
import useMutation from "../hooks/useMutation";
import LazyLoadImg from "./LazyLoadImg";
import Modal from "./Modal";
import ProductFrom from "./ProductFrom";

const ProductCard = ({ product }) => {
  const [isopenProduct, setisOpenProduct] = useState(false);

  const { mutate, loading } = useMutation();
  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this ?")) {
      // axios.delete(`products/${id}`).then((res) => console.log(res));
      mutate(() => deleteProduct(id));
    }
  };

  return (
    <div className="card">
      <LazyLoadImg url={product.image} />

      <div className="box">
        <h3>
          <Link to={`/products/${product._id}`}>
            <span />
            {product.title}
          </Link>
        </h3>
        <h4>${product.price}</h4>

        <div className="btn_div">
          <button className="btn_edit" onClick={() => setisOpenProduct(true)}>
            Edit
          </button>
          <button
            className="btn_delete"
            onClick={() => handleDelete(product._id)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
      </div>

      {/* Products from */}

      {isopenProduct && (
        <Modal titleTxt={"Update product"} setOpen={setisOpenProduct}>
          <ProductFrom btnTxt={"Update"} data={product} />
        </Modal>
      )}
    </div>
  );
};

export default ProductCard;
