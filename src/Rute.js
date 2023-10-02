import React from "react";

import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Admin from "./layouts/Admin";
import Blog from "./layouts/Blog";
import Login from "./layouts/Login";
import Kategori from "./pages/Kategori";

export default function Rute() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog/*" element={<Blog />} />
        <Route path="/admin/*" element={<Admin />}/>
      </Routes>
    </Router>
  );
}

function NotFound() {
  return <h2>404 NOT FOUND</h2>;
}
