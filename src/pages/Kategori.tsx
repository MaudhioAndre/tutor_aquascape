import React, { useEffect, useState, useRef } from "react";

import axios from "axios";
import RSModalSpinner from "../components/etc/RSModalSpinner";

import { useParams } from "react-router-dom";
import { blogType } from "./BlogAdmin";
// import { kategoriType } from "./KategoriAdmin";
import FrontLayout from "../layouts/FrontLayout";

import ListBlog from "../components/content/Front/ListBlog";
import SidebarHome from "../components/content/Front/SidebarHome";

import { Helmet } from "react-helmet-async";

interface typeRef {
  setStatusModal(value: boolean): void;
}

interface kategoriType {
  id: string;
  nama: string;
  foto: string;
  recordStatus: string;
}

export default function Kategori() {
  const [blog, setBlog] = useState<blogType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [detailKategori, setDetailKategori] = useState<kategoriType>({
    foto: "",
    id: "",
    nama: "",
    recordStatus: "",
  });
  
  let { nama, id } = useParams();

  useEffect(() => {
    async function getPostInKategori() {
      childRef.current?.setStatusModal(true);
      setLoading(true);

      //   console.log(url_slug);
      var formData = new FormData();
      formData.append("id", id!);

      await axios
        .post(`${window.config.api}/getbloginkategori`, formData)
        .then((res) => {
          console.log(res);
          if (res.data.Error == 0) {
            setBlog(res.data.blog || []);
            setDetailKategori(res.data.detailKategori[0]);
          }
          childRef.current?.setStatusModal(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          childRef.current?.setStatusModal(false);
          setLoading(false);
        });
    }

    getPostInKategori();
  }, [nama, id]);

  const childRef = useRef<typeRef>(null);

  function getValue(data: any) {
    if (data) {
      return data.foto;
    } else {
      return null;
    }
  }

  return (
    <>
      <Helmet>
        <title>
          {" "}
          {nama} | {window.config.appname}
        </title>
      </Helmet>
      {/* <div className="div-banner-kategori" style={{backgroundImage:`url:${(detailKategori && getValue(detailKategori))}`}}> */}
      <div
        className="div-banner-kategori"
        style={{
          // backgroundImage: `url(${detailKategori && detailKategori.foto})`,
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${
            detailKategori && detailKategori.foto
          })`,
        }}
      >
        {/* <img src={detailKategori[0].foto} alt="category-photo" className="img-kategori" /> */}
        <div className="nama-kategori">{nama}</div>
      </div>

      <div className="content_home">
        <ListBlog loading={loading} blog={blog} isLatestBlog={false} />
        <SidebarHome />
      </div>

      <RSModalSpinner ref={childRef} />
    </>
  );
}
