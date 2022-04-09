import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../App.css";
import Footer from "./Footer";
import FullNews from "./FullNews";
import Header from "./Header";
import MainPages from "./MainPages";
import SigninPage from "./Signin";
import SigninUpPage from "./Signup";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPages />} />
        <Route path="/category/:cat/:id" element={<MainPages />} />
        <Route path="/news/:id" element={<FullNews />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SigninUpPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
