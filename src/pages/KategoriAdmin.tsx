import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import RSModalSpinner from "../components/etc/RSModalSpinner";
import ContentKategori from "../components/content/ContentKategori";
import ModalBlog from "../components/content/ModalBlog";

import { Helmet } from 'react-helmet-async';
import ModalKategori from "../components/content/ModalKategori";
export interface kategoriType {
  id: string;
  nama: string;
  foto: string;
  recordStatus: string;
}
interface typeRef {
  setStatusModal(value: boolean): void;
}

export default function KategoriAdmin() {
  const [kategori, setKategori] = useState<kategoriType[]>([]);
  const [dataEdit, setDataEdit] = useState<kategoriType>({
    id: "",
    nama: "",
    foto: "",
    recordStatus: "",
  });
  const [modal, setModal] = useState<boolean>(false);
  const [aksi, setAksi] = useState<string>("tambah");

  const getKategori = async () => {
    console.log("getParam4");
    childRef.current?.setStatusModal(true);
    await axios
      .get(`${window.config.api}/getkategori`)
      .then((res) => {
        console.log(res);
        if (res.data.Error == 0) {
          setKategori(res.data.kategori);
        } else {
          setKategori([]);
        }
        childRef.current?.setStatusModal(false);
      })
      .catch((error) => {
        console.log(error);
        childRef.current?.setStatusModal(false);
      });
  };

  useEffect(() => {
    getKategori();
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
        <title>Kategori | {window.config.appname}</title>
      </Helmet>
      <RSModalSpinner ref={childRef} />
      <div className="div_title_blog_page">
        <div className="div_title_blog">KATEGORI</div>
        <button className="btn_admin" onClick={() => setModal(true)}>
          Tambah
        </button>
      </div>
      <div className="hr" />
      <div className="content_blog_utama">
        <ContentKategori
          kategori={kategori}
          getKategori={getKategori}
          openModalEdit={openModalEdit}
          setDataEdit={setDataEdit}
          setStatusModal={childRef.current?.setStatusModal}
        />
      </div>
      <ModalKategori
        getKategori={getKategori}
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
