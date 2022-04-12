import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadNews } from "../redux/features/news";
import Cart from "./News-Cart";
import CircularProgress from "@mui/material/CircularProgress";

export default function News() {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);

  // console.log(news)

  const loader = useSelector((state) => state.news.loading);
  const error = useSelector((state) => state.news.error);

  const { id } = useParams();

  useEffect(() => {
    dispatch(loadNews());
  }, [dispatch]);

  const filteredNews = news.filter((item) => {
    if (!id || id === "624c6231e90aeeba94cafd19") return true;

    return item.category === id;
  });

  if (loader) {
    return (
      <div className={"loader"}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="content">
      {filteredNews.map((item, index) => {
        return (
          <div key={item._id}>
            <Cart
              img={item.img}
              title={item.title}
              text={item.text}
              index={index}
              id={item._id}
            />
            <hr />
          </div>
        );
      })}
    </div>
  );
}
