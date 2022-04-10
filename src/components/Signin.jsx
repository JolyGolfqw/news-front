import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../redux/features/application";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";

export default function Signin() {
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const userName = localStorage.getItem("name");

  const error = useSelector((state) => state.application.errorSingnIn);
  const signingIn = useSelector((state) => state.application.signingIn);
  const token = useSelector((state) => state.application.token);

  const handleLogin = (e) => {
    setLogin(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if (!login || !password) {
      return alert("Заполните все поля");
    }
    dispatch(auth(login, password));
    localStorage.setItem("name", login);
  };

  return (
    <>
      <main className="form-signin">
        <form className="form">
          <img
            className="sign-logo"
            src="https://avatars.githubusercontent.com/u/75647218?s=200&v=4"
            alt="Intocode"
          />
          {signingIn ? (
            <div>
              <LinearProgress />
            </div>
          ) : error ? (
            <h1 className="h3 mb-3 fw-normal error">{error}</h1>
          ) : (
            <h1 className="h3 mb-3 fw-normal">
              {token ? `Добро пожаловать, ${userName}` : "Авторизуйтесь"}
            </h1>
          )}

          <div className="form-floating">
            <input
              value={login}
              onChange={(e) => handleLogin(e)}
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Имя пользователя</label>
          </div>
          <div className="form-floating">
            <input
              value={password}
              onChange={(e) => handlePassword(e)}
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Пароль</label>
          </div>

          <div className="checkbox mb-3"></div>
          <button
            disable={signingIn}
            onClick={(e) => handleAuth(e)}
            className="w-100 btn btn-lg btn-primary"
            type="submit"
          >
            Войти
          </button>
          <div>
            <Link to="/signup">Нет аккаунта?</Link>
          </div>
          <p className="mt-5 mb-3 text-muted">© 2022</p>
        </form>
      </main>
    </>
  );
}
