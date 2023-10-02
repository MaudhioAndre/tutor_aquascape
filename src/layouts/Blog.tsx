import React from "react";

import { Route, Routes, useParams } from "react-router-dom";
import HeaderFront from "../components/header/HeaderFront";
import FooterFront from "../components/footer/FooterFront";
import Home from "../pages/Home";
import DetailBlog from "../pages/DetailBlog";
import MenuFront from "../components/menu/MenuFront";
import Kategori from "../pages/Kategori";
import FrontLayout from "./FrontLayout";

export default function Blog(props : any) {
  return (
    <>
      {/* <HeaderFront />
      <MenuFront />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:url_slug" element={<DetailBlog />} />
        <Route path="/category/:nama/:id" element={<Kategori />} />
      </Routes> */}
      {/* <FooterFront /> */}
      <FrontLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page/:page?" element={<Home />} />
          
          {/* <Route path="/page/:page" element={(props) => <Home {...props} key={Date.now()}/>} /> */}
          <Route path="/:url_slug" element={<DetailBlog />} />
          <Route path="/category/:nama/:id" element={<Kategori />} />
        </Routes>
      </FrontLayout>
    </>
  );
}

function About() {
  let { id } = useParams();
  console.log(id);
  return <h2>About</h2>;
}
