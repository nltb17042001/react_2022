import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Products from "../components/Products";
import Sorting from "../components/Sorting";
import { useMyContext } from "../context/store";
import useInfinityQuery from "../hooks/useInfinityQuery";
import useQuery from "../hooks/useQuery";

const Filter = () => {
  const { option, value } = useParams();
  const { sort } = useMyContext();

  const [products, setProducts] = useState();
  const [limit, setLimit] = useState(5);
  const [stop, setStop] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);

  const { BtnRender, data, loading, error } = useInfinityQuery({
    url: `products?price[${option}]=${value}&sort=${sort}&limit=${limit}`,
    depens: [value, sort, option],
    opt: { stop, firstLoad },
  });

  useEffect(() => {
    if (data?.products) setProducts(data.products);
  }, [data?.products]);

  useEffect(() => {
    if (data?.products) {
      setProducts((prev) => [...prev, ...data.products]);
      setFirstLoad(true);

      if (data.products.length < limit) setStop(true);
    }
  }, [data?.products, limit]);

  useEffect(() => {
    setProducts([]);
    setLimit();
    setStop(false);
    setFirstLoad(false);
    console.log(123132);
  }, [value, sort, option]);

  return (
    <>
      <div>
        <Sorting />
        {products && <Products products={products} />}
        {loading && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
        {BtnRender()}
      </div>
    </>
  );
};

export default Filter;
