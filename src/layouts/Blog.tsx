import React from "react";

import { Route, Routes, useParams } from "react-router-dom";
import HeaderFront from "../components/header/HeaderFront";
import FooterFront from "../components/footer/FooterFront";
import Home from "../pages/Home";
import DetailBlog from "../pages/DetailBlog";

export default function Blog() {
  return (
    <>
      <HeaderFront />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<DetailBlog />} />
      </Routes>
      <FooterFront />
    </>
  );
}

function About() {
  let { id } = useParams();
  console.log(id);
  return <h2>About</h2>;
}
