import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default React.memo(function Cart({ img, title, text, index, id }) {
  Cart.propTypes = {
    img: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
  };

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
});
