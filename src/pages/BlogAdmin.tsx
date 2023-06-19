import React, { useState, useEffect, useRef } from "react";
import DFormat from "../components/etc/DFormat";
import axios from "axios";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import Swal from "sweetalert2";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import {
  align,
  fontSize,
  fontColor,
  hiliteColor,
  list
} from "suneditor/src/plugins";

import dateFormat, { masks } from "dateformat";
import RSModalSpinner from "../components/etc/RSModalSpinner";

const parse = require("html-react-parser");

masks.Waktu = "d mmmm yyyy,HH:MM";

interface blogType {}

interface typeRef {
  setStatusModal(value: boolean): void;
}

export default function BlogAdmin() {
  const [blog, setBlog] = useState<blogType[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [aksi, setAksi] = useState<string>("tambah");
  const [id, setId] = useState<string>("");
  const [judul, setJudul] = useState<string>("");
  const [deskripsi, setDeskripsi] = useState<string>("");
  const [foto, setFoto] = useState<File | undefined>(undefined);
  const [prevFoto, setPrevFoto] = useState<string>();

  const getBlog = async () => {
    console.log("getParam4");
    childRef.current?.setStatusModal(true);
    await axios
      .get(`${window.config.api}/getblog`)
      .then((res) => {
        console.log(res);
        if (res.data.Error == 0) {
          setBlog(res.data.blog);
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

  function onCloseModal() {
    setJudul("");
    setDeskripsi("");
    setFoto(undefined);
    setModal(false);
    setAksi("tambah");
    setPrevFoto("");
  }

  function tambahBlog(e: React.SyntheticEvent) {
    console.log("tambahBlog");

    e.preventDefault();
    childRef.current?.setStatusModal(true);

    var formData = new FormData();
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);
    formData.append("foto", foto!);

    axios
      .post(`${window.config.api}/tambahblog`, formData)
      .then((res) => {
        console.log(res);
        childRef.current?.setStatusModal(false);
        if (res.data.Error == 0) {
          getBlog();
          modalNotif("success", res.data.Message, "");
          setTimeout(() => {
            onCloseModal();
          }, 2000);
        } else {
          modalNotif("error", res.data.Message, "");
        }
      })
      .catch((err) => {
        console.log(err);
        modalNotif("error", "Simpan Gagal", "Terjadi kesalahan pada sistem!");
        childRef.current?.setStatusModal(false);
      });
  }

  function ubahStatusBlog(id: string, status: string) {
    childRef.current?.setStatusModal(true);

    var formData = new FormData();
    formData.append("id", id);
    formData.append("status", status);

    axios
      .post(`${window.config.api}/ubahstatusblog`, formData)
      .then((res) => {
        console.log(res);
        childRef.current?.setStatusModal(false);
        if (res.data.Error == 0) {
          getBlog();
          modalNotif("success", res.data.Message, "");
        } else {
          modalNotif("error", res.data.Message, "");
        }
      })
      .catch((err) => {
        console.log(err);
        modalNotif("error", "Gagal", "Terjadi kesalahan pada sistem!");
        childRef.current?.setStatusModal(false);
      });
  }

  function hapusBlog(id: string) {
    Swal.fire({
      title: "Apakah anda yakin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      confirmButtonColor: "#ff0055",
      cancelButtonColor: "#999999",
      cancelButtonText: "Batal",
      reverseButtons: true,
      focusConfirm: false,
      focusCancel: true,
    }).then((res) => {
      if (res.value) {
        childRef.current?.setStatusModal(true);

        var formData = new FormData();
        formData.append("id", id);

        axios
          .post(`${window.config.api}/hapusblog`, formData)
          .then((res) => {
            console.log(res);
            childRef.current?.setStatusModal(false);
            if (res.data.Error == 0) {
              getBlog();
              modalNotif("success", res.data.Message, "");
            } else {
              modalNotif("error", res.data.Message, "");
            }
          })
          .catch((err) => {
            console.log(err);
            modalNotif("error", "Gagal", "Terjadi kesalahan pada sistem!");
            childRef.current?.setStatusModal(false);
          });
      }
    });
  }

  function modalNotif(type: any, title: string, text: string) {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      console.log("then");
    });
  }

  function ubahBlog(e: React.SyntheticEvent) {
    e.preventDefault();
    childRef.current?.setStatusModal(true);

    var formData = new FormData();
    formData.append("id", id);
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);
    formData.append("foto", foto!);

    axios
      .post(`${window.config.api}/ubahblog`, formData)
      .then((res) => {
        console.log(res);
        childRef.current?.setStatusModal(false);
        if (res.data.Error == 0) {
          getBlog();
          modalNotif("success", res.data.Message, "");
          setTimeout(() => {
            onCloseModal();
          }, 2000);
        } else {
          modalNotif("error", res.data.Message, "");
        }
      })
      .catch((err) => {
        console.log(err);
        modalNotif("error", "Simpan Gagal", "Terjadi kesalahan pada sistem!");
        childRef.current?.setStatusModal(false);
      });
  }

  function openModalEdit(
    id: string,
    judul: string,
    deskripsi: string,
    foto: string
  ) {
    console.log("openModalEdit");
    setAksi("ubah");
    setModal(true);
    setId(id);
    setJudul(judul);
    setDeskripsi(parse(deskripsi));
    setPrevFoto(foto);
  }

  const childRef = useRef<typeRef>(null);
  DFormat("id");
  return (
    <>
      <div className="div_title_blog_page">
        <div className="div_title_blog">BLOG</div>
        <button className="btn_admin" onClick={() => setModal(true)}>
          Tambah
        </button>
      </div>
      <div className="hr" />
      <div className="content_blog_utama">
        {blog.length == 0 ? (
          <h5>Data Kosong</h5>
        ) : (
          blog &&
          blog.map((data: any, index: any) => {
            return (
              <React.Fragment key={index}>
                <div className="card_blog">
                  <img src={data.foto} alt="image" className="img_blog" />
                  <div className="div_desc_blog">
                    <div className="title_blog">{data.judul}</div>
                    <div className="div_footer_content">
                      <div>{dateFormat(data.createdAt, "Waktu")}</div>

                      <div className="div_utility_button">
                        {data.recordStatus === "N" ? (
                          <button
                            className="btn_utility_button"
                            onClick={() => ubahStatusBlog(data.id, "D")}
                          >
                            <img
                              className="icon_utility"
                              src={require("../assets/img/icon/close.png")}
                            />
                          </button>
                        ) : (
                          <button
                            className="btn_utility_button"
                            onClick={() => ubahStatusBlog(data.id, "N")}
                          >
                            <img
                              src={require("../assets/img/icon/check.png")}
                            />
                          </button>
                        )}

                        <button
                          className="btn_utility_button"
                          onClick={() =>
                            openModalEdit(
                              data.id,
                              data.judul,
                              data.deskripsi,
                              data.foto
                            )
                          }
                        >
                          <img className="icon_utility" src={require("../assets/img/icon/pencil.png")} />
                        </button>
                        <button
                          className="btn_utility_button"
                          onClick={() => hapusBlog(data.id)}
                        >
                          <img
                          className="icon_utility"
                            src={require("../assets/img/icon/trash-can.png")}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        )}
      </div>

      <Modal isOpen={modal} className={"modal_blog"}>
        <ModalHeader toggle={() => onCloseModal()}>
          {aksi == "tambah" ? "Tambah" : "Ubah"} Blog
        </ModalHeader>
        <form onSubmit={aksi == "tambah" ? tambahBlog : ubahBlog}>
          <ModalBody>
            <div className="div_form_group">
              <div className="label_input_blog">
                Judul <div className="mandatory">&nbsp;*</div>
              </div>
              <input
                type="text"
                onChange={(e) => setJudul(e.target.value)}
                required
                value={judul}
                maxLength={200}
                className="input_text_blog"
              />
            </div>
            <div className="div_form_group input_foto">
              <div>
                <div className="label_input_blog">
                  Foto <div className="mandatory">&nbsp;*</div>
                </div>
                <img
                  src={
                    prevFoto == "" || prevFoto == undefined
                      ? require("../assets/img/addBg.jpg")
                      : prevFoto
                  }
                  className="img-prevFoto"
                />
              </div>
              <input
                type="file"
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setPrevFoto(
                    URL.createObjectURL(
                      (e.target as HTMLInputElement)?.files?.[0]!
                    )
                  );
                  setFoto((e.target as HTMLInputElement)?.files?.[0]);
                }}
                required={aksi == "tambah" ? true : false}
              />
            </div>
            <div className="div_form_group">
              <div className="label_input_blog">
                Deskripsi <div className="mandatory">&nbsp;*</div>
              </div>
              <div style={{ width: "100%" }}>
                <SunEditor
                  placeholder={""}
                  onChange={(evt) => setDeskripsi(evt)}
                  setContents={deskripsi}
                  // enable={true}
                  setOptions={{
                    buttonList: [
                      [
                        "fontSize",
                        "bold",
                        "italic",
                        "underline",
                        "fontColor",
                        "hiliteColor",
                        "outdent",
                        "indent",
                        "align",
                        "list",
                      ],
                    ],
                    plugins: [fontSize, fontColor, hiliteColor, align, list],
                  }}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn_admin">
              Simpan
            </button>
          </ModalFooter>
        </form>
      </Modal>

      <RSModalSpinner ref={childRef} />
    </>
  );
}
