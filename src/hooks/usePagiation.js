import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/store";
import useCustomRouter from "./useCustomRouter";

const usePagiation = (totalPages) => {
  const { pushQuery } = useCustomRouter();
  const { page, sort } = useMyContext();

  const { firstArr, lastArr } = useMemo(() => {
    const newArr = [...Array(totalPages)].map((_, i) => i + 1);
    console.log(newArr);
    if (totalPages < 4) {
      return {
        firstArr: newArr,
        lastArr: [],
      };
    }

    if (totalPages - page >= 4) {
      return {
        firstArr: newArr.slice(page - 1, page + 2),
        lastArr: newArr.slice(totalPages - 1),
      };
    } else {
      return {
        firstArr: newArr.slice(totalPages - 4, totalPages),
        lastArr: [],
      };
    }
  }, [totalPages, page]);
  console.log({ firstArr, lastArr });

  const isActive = (index) => {
    if (index === page) return "active";
    return "";
  };

  const prev = () => {
    const newPage = Math.max(page - 1, 1);
    pushQuery({ page: newPage, sort });
  };

  const next = () => {
    const newPage = Math.min(page + 1, totalPages);
    pushQuery({ page: newPage, sort });
  };

  const jump = (num) => {
    pushQuery({ page: num, sort });
  };

  return { firstArr, lastArr, isActive, prev, next, jump };
};

export default usePagiation;
