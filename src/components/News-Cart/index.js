import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ img, title, text, index, id }) {
  return (
    <div className="news">
      {index % 2 === 0 ? (
        <>
          <img src={img} alt={title} />
          <div className="desc_news">
            <h1>{title}</h1>
            <p>{text}</p>
            <button className="more more_btn">
              <Link to={`/news/${id}`}>{"подробнее >>"}</Link>{" "}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="desc_news_two">
            <h1>{title}</h1>
            <p>{text}</p>
            <button className="more_two more_btn">
              <Link to={`/news/${id}`}>{"подробнее >>"}</Link>{" "}
            </button>
          </div>
          <img src={img} alt={title} />
        </>
      )}
    </div>
  );
}
