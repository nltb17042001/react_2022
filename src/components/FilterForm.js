import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const FilterForm = () => {
  const inputRef = useRef();
  const selecRef = useRef("lt");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    const option = selecRef.current.value;
    console.log(option);
    console.log(value);
    if (!value.trim()) return;
    return   navigate(`/filter/${option}/${value}`);
  };
  return (
    <div className="filter_form" title="Enter to Filter">
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="0" required ref={inputRef} />

          <select ref={selecRef}>
            <option value="lt" title="lesser than">
              LT
            </option>
            <option value="lte" title="lesser than or qual">
              LTE
            </option>
            <option value="gt" title="greater than">
              GT
            </option>
            <option value="gte" title="greater then or qual">
              GTE
            </option>
          </select>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default FilterForm;
