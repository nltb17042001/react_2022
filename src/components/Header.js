import React, { useState } from "react";
import { Link } from "react-router-dom";
import FilterForm from "./FilterForm";
import Modal from "./Modal";
import ProductFrom from "./ProductFrom";
import SearchForm from "./SearchForm";

const Header = () => {
  const [isopensearch, setIsopenSearch] = useState(false);
  const [isopenfilter, setIsopenFilter] = useState(false);
  const [isopenproduct, setIsopenProduct] = useState(false);
  return (
    <header>
      <nav>
        <p>
          <Link to="/">Home</Link>
        </p>
        <p onClick={() => setIsopenProduct(true)}>Create Product</p>
        <p onClick={() => setIsopenSearch(true)}>Search</p>
        <p onClick={() => setIsopenFilter(true)}>Filter</p>
      </nav>

      {/* modal search */}
      {isopensearch && (
        <Modal titleTxt={"Search"} setOpen={setIsopenSearch}>
          <SearchForm />
        </Modal>
      )}

      {/* modal filter */}
      {isopenfilter && (
        <Modal titleTxt={"Filter"} setOpen={setIsopenFilter}>
          <FilterForm />
        </Modal>
      )}

      {/* modal create product */}
      {isopenproduct && (
        <Modal titleTxt={"Create Product"} setOpen={setIsopenProduct}>
          <ProductFrom btnTxt="add" />
        </Modal>
      )}
    </header>
  );
};

export default Header;
