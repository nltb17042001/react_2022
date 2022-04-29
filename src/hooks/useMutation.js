import React, { useState } from "react";
import { toast } from "react-toastify";
import { createProduct } from "../api/productAPI";
import { useMyContext } from "../context/store";

const useMutation = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { setRefetching } = useMyContext();

  const mutate = (callback) => {
    setLoading(true);
    callback()
      .then((res) => {
        setData(res.data);
        toast.success("Success!");
        setRefetching(prev => !prev); 
      })
      .catch((err) => {
        setError(err.response.data.msg);
        toast.error(err.response.data.msg);
      })
      .finally(() => setLoading(false));
  };

  return { mutate, data, loading, error };
};

export default useMutation;
