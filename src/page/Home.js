import { useState, useEffect, useMemo, useRef, useContext } from "react";
import axios from "axios";
import Products from "../components/Products";
import useQuery from "../hooks/useQuery";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
import Sorting from "../components/Sorting";
import { useMyContext } from "../context/store";
const Home = () => {
  const [limit, setLimit] = useState(100);
  const [products, setProducts] = useState([]);
  const ref = useRef(0);

  const { page, sort, refetching } = useMyContext();
  const { data, loading, error } = useQuery(
    `/products?limit=${limit}&page=${page}&sort=${sort}`,
    { saveCache: true, refetching }
  );
  console.log(data);

  useEffect(() => {
    if (data?.products) setProducts(data.products);
  }, [data?.products]);

  const totalPages = useMemo(() => {
    if (!data?.count) return 0;
    return Math.ceil(data.count / limit);
  }, [data?.count]);

  return (
    <>
      <div>
        <h2>Render : {ref.current++}</h2>
        <Sorting page={page}></Sorting>
        {products && <Products products={products} />}
        {loading && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
};
export default Home;
