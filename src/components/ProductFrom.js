import axios from "axios";
import React, { useRef } from "react";
import { createProduct, updateProduct } from "../api/productAPI";
import useMutation from "../hooks/useMutation";

const ProductFrom = ({ btnTxt, data }) => {
  const multiRef = useRef();
  const { mutate, loading } = useMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const children = multiRef.current.children;
    console.log([...children]);
    const newData = [...children].reduce((obj, child) => {
      if (!child.name) return obj;
      if (child.name === "price") {
        return { ...obj, [child.name]: child.value * 1 };
      } else {
        return { ...obj, [child.name]: child.value };
      }
    }, {});
    console.log(newData);
    if (data) {
      const result = shallowEqual(newData, data);
      if (result) return;
      // axios
      //   .put(`products/${data._id}`, newData)
      //   .then((res) => console.log(res));
      // updateProduct({ id: data._id, newData }).then((res) => console.log(res));
      mutate(() => updateProduct({ id: data._id, newData }));
    } else {
      // axios.post(`products`, newData).then((res) => console.log(res));
      // createProduct(newData).then((res) => console.log(res));
      mutate(() => createProduct(newData));
    }
  };

  function shallowEqual(obj1, obj2) {
    const keys = Object.keys(obj1);
    for (let key of keys) {
      if (obj1[key] !== obj2[key]) {
        console.log(obj2[key]);
        return false;
      }
    }
    return true;
  }
  return (
    <div className="product_form">
      <form ref={multiRef} onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Product title"
          required
          defaultValue={data ? data.title : ""}
        />
        <input
          type="text"
          name="description"
          placeholder="Product Description"
          required
          defaultValue={data ? data.description : ""}
        />
        <input
          type="text"
          name="price"
          placeholder="Product Price"
          required
          defaultValue={data?.price}
        />
        <input
          type="text"
          name="category"
          placeholder="Product Category"
          required
          defaultValue={data ? data.category : ""}
        />
        <input
          type="text"
          name="image"
          placeholder="Product image"
          required
          defaultValue={data ? data.image : ""}
        />

        <button disabled={loading}>{loading ? "Loading" : btnTxt}</button>
      </form>
    </div>
  );
};

export default ProductFrom;
