import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import RSModalSpinner from "../components/etc/RSModalSpinner";
import ContentBlog from "../components/content/ContentBlog";
import ModalBlog from "../components/content/ModalBlog";

import { Helmet } from 'react-helmet-async';
export interface blogType {
  id: string;
  judul: string;
  kategori: number;
  foto: string;
  url_slug: string;
  alt_img: string;
  meta_desc: string;
  createdAt: string;
  recordStatus: string;
  deskripsi: string;
}
interface typeRef {
  setStatusModal(value: boolean): void;
}

export default function BlogAdmin() {
  const [blog, setBlog] = useState<blogType[]>([]);
  const [dataEdit, setDataEdit] = useState<blogType>({
    id: "",
    judul: "",
    kategori: 0,
    url_slug: "",
    alt_img: "",
    meta_desc: "",
    foto: "",
    createdAt: "",
    recordStatus: "",
    deskripsi: "",
  });
  const [modal, setModal] = useState<boolean>(false);
  const [aksi, setAksi] = useState<string>("tambah");

  const getBlog = async () => {
    console.log("getParam4");
    childRef.current?.setStatusModal(true);
    await axios
      .get(`${window.config.api}/getblog`)
      .then((res) => {
        console.log(res);
        if (res.data.Error == 0) {
          setBlog(res.data.blog);
        } else {
          setBlog([]);
        }
        childRef.current?.setStatusModal(false);
      })
      .catch((error) => {
        console.log(error);
        childRef.current?.setStatusModal(false);
      });
  };

  useEffect(() => {
    getBlog();
  }, []);

  function openModalEdit() {
    console.log("openModalEdit");
    setAksi("ubah");
    setModal(true);
  }

  const childRef = useRef<typeRef>(null);

  return (
    <>
      <Helmet>
        <title>Blog | {window.config.appname}</title>
      </Helmet>
      <RSModalSpinner ref={childRef} />
      <div className="div_title_blog_page">
        <div className="div_title_blog">BLOG</div>
        <button className="btn_admin" onClick={() => setModal(true)}>
          Tambah
        </button>
      </div>
      <div className="hr" />
      <div className="content_blog_utama">
        <ContentBlog
          blog={blog}
          getBlog={getBlog}
          openModalEdit={openModalEdit}
          setDataEdit={setDataEdit}
          setStatusModal={childRef.current?.setStatusModal}
        />
      </div>
      <ModalBlog
        getBlog={getBlog}
        modalIsOpen={modal}
        aksiModal={aksi}
        setAksi={setAksi}
        toggleModal={setModal}
        dataEdit={dataEdit}
      />
      <RSModalSpinner ref={childRef} />
    </>
  );
}
