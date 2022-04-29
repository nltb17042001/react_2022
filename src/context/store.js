import react, { useContext, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export const Store = react.createContext();

export const useMyContext = () => useContext(Store);
export const ContextProvider = ({ children }) => {
  const cache = useRef({});

  const [refetching, setRefetching] = useState(false);
  const { search } = useLocation();
  const { page, sort } = useMemo(() => {
    const page = new URLSearchParams(search).get("page") || 1;
    const sort = new URLSearchParams(search).get("sort") || "-price";
    return {
      page: Number(page),
      sort: sort,
    };
  }, [search]);

  Store.displayName = "Test features";
  const value = { page, sort, cache, refetching, setRefetching };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
