import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

export default function Header() {
  const token = useSelector((state) => state.application.token);

  const userName = localStorage.getItem("name");

  const handleUnSign = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    return;
  };

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          <img
            className="logo"
            src="https://avatars.githubusercontent.com/u/75647218?s=200&v=4"
            alt="intocode"
          />
        </a>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a href="/" className="nav-link px-2 link-secondary">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2 link-dark">
              Features
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2 link-dark">
              Pricing
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2 link-dark">
              FAQs
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2 link-dark">
              About
            </a>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          {token ? (
            <>
              <span className="headerName">{userName}</span>
              <a href="/">
                <button
                  onClick={handleUnSign}
                  type="button"
                  className="btn btn-outline-primary me-2"
                >
                  Выйти
                </button>
              </a>
            </>
          ) : (
            <>
              <Link to="/signin">
                <button type="button" className="btn btn-outline-primary me-2">
                  Вход
                </button>
              </Link>
              <Link to="/signup">
                <button type="button" className="btn btn-primary">
                  Регистрация
                </button>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
