import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" index element={<Home />} />
          <Route path="/home" index element={<Home />} />
          <Route path="/home" index element={<Home />} />
          <Route path="/home" index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
