import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadCategories } from "../redux/features/categories";

export default function Categories() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <div className={"categories"}>
      {categories.map((item, index) => {
        return (
          <Link
            key={index}
            className="category"
            to={`/category/${item.category}/${item._id}`}
          >
            {item.category}
          </Link>
        );
      })}
    </div>
  );
}
