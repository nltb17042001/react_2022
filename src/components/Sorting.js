import React from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { useNavigate } from "react-router-dom";
import useCustomRouter from "../hooks/useCustomRouter";
import { useMyContext } from "../context/store";
const Sorting = React.memo(({ page }) => {
  const { sort } = useMyContext();
  const { pushQuery } = useCustomRouter();
  const handleSort = (e) => {
    const { value } = e.target;
    console.log(value);
    pushQuery({ page, sort: value });
  };
  return (
    <div className="sorting">
      <select onChange={handleSort} value={sort}>
        <option value="-createdAt">Newest</option>
        <option value="createdAt">Oldest</option>
        <option value="-price">Price: Hight-Low</option>
        <option value="price">Price: Low-Hight</option>
      </select>
      <h2>&#8678;Sort</h2>
    </div>
  );
});

export default Sorting;
