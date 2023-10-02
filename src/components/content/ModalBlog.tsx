import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import ModalNotif from "../etc/ModalNotif";
import RSModalSpinner from "../etc/RSModalSpinner";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import {
  align,
  fontSize,
  fontColor,
  hiliteColor,
  list,
} from "suneditor/src/plugins";

import { blogType } from "../../pages/BlogAdmin";
import { kategoriType } from "../../pages/KategoriAdmin";

const parse = require("html-react-parser");

interface propTypes {
  getBlog: () => void;
  modalIsOpen: boolean;
  toggleModal: Dispatch<SetStateAction<boolean>>;
  setAksi: Dispatch<SetStateAction<string>>;
  dataEdit: blogType;
  aksiModal: string;
}

interface typeRef {
  setStatusModal(value: boolean): void;
}

export default function ModalBlog({
  getBlog,
  modalIsOpen,
  toggleModal,
  dataEdit,
  aksiModal,
  setAksi,
}: propTypes) {
  const [modal, setModal] = useState<boolean>(modalIsOpen);
  // const [aksi, setAksi] = useState<string>(aksiModal || "tambah");
  const [id, setId] = useState<string>("");
  const [judul, setJudul] = useState<string>("");
  const [kategori, setKategori] = useState<number>(0);
  const [listKategori, setListKategori] = useState<kategoriType[]>([]);
  const [deskripsi, setDeskripsi] = useState<string>("");
  const [url_slug, setUrlSlug] = useState<string>("");
  const [alt_img, setAltImg] = useState<string>("");
  const [meta_desc, setMetaDesc] = useState<string>("");
  const [foto, setFoto] = useState<File | undefined>(undefined);
  const [prevFoto, setPrevFoto] = useState<string>();

  function onCloseModal() {
    setJudul("");
    setKategori(0);
    setDeskripsi("");
    setUrlSlug("");
    setAltImg("");
    setMetaDesc("");
    setFoto(undefined);
    setModal(false);
    // setAksi("tambah");
    setPrevFoto("");
    toggleModal(false);
    setAksi("tambah");
  }

  useEffect(() => {
    setModal(modalIsOpen);
  }, [modalIsOpen]);

  const getKategoriFront = async () => {
    console.log("getParam4");
    childRef.current?.setStatusModal(true);
    await axios
      .get(`${window.config.api}/getkategorifront`)
      .then((res) => {
        console.log(res);
        if (res.data.Error == 0) {
          setListKategori(res.data.kategori);
        } else {
          setListKategori([]);
        }
        childRef.current?.setStatusModal(false);
      })
      .catch((error) => {
        console.log(error);
        childRef.current?.setStatusModal(false);
      });
  };

  useEffect(() => {
    getKategoriFront();
  }, []);

  useEffect(() => {
    setId(dataEdit.id);
    setDeskripsi(dataEdit.deskripsi);
    // setDeskripsi(parse(dataEdit.deskripsi));
    setJudul(dataEdit.judul);
    setKategori(dataEdit.kategori);
    setUrlSlug(dataEdit.url_slug);
    setAltImg(dataEdit.alt_img);
    setMetaDesc(dataEdit.meta_desc);
    setPrevFoto(dataEdit.foto);
  }, [dataEdit]);

  function tambahBlog(e: React.SyntheticEvent) {
    console.log("tambahBlog");

    e.preventDefault();
    childRef.current?.setStatusModal(true);

    var formData = new FormData();
    formData.append("judul", judul);
    formData.append("kategori", kategori.toString());
    formData.append("deskripsi", deskripsi);
    formData.append("url_slug", url_slug);
    formData.append("alt_img", alt_img);
    formData.append("meta_desc", meta_desc);
    formData.append("foto", foto!);

    axios
      .post(`${window.config.api}/tambahblog`, formData)
      .then((res) => {
        console.log(res);
        childRef.current?.setStatusModal(false);
        if (res.data.Error == 0) {
          getBlog();
          ModalNotif("success", res.data.Message, "");
          setTimeout(() => {
            onCloseModal();
            setAksi("tambah");
          }, 2000);
        } else {
          ModalNotif("error", res.data.Message, "");
        }
      })
      .catch((err) => {
        console.log(err);
        ModalNotif("error", "Simpan Gagal", "Terjadi kesalahan pada sistem!");
        childRef.current?.setStatusModal(false);
      });
  }

  function ubahBlog(e: React.SyntheticEvent) {
    e.preventDefault();
    childRef.current?.setStatusModal(true);

    var formData = new FormData();
    formData.append("id", id);
    formData.append("judul", judul);
    formData.append("kategori", kategori.toString());
    formData.append("deskripsi", deskripsi);
    formData.append("url_slug", url_slug);
    formData.append("alt_img", alt_img);
    formData.append("meta_desc", meta_desc);
    formData.append("foto", foto!);

    axios
      .post(`${window.config.api}/ubahblog`, formData)
      .then((res) => {
        console.log(res);
        childRef.current?.setStatusModal(false);
        if (res.data.Error == 0) {
          getBlog();
          ModalNotif("success", res.data.Message, "");
          setTimeout(() => {
            onCloseModal();
          }, 2000);
        } else {
          ModalNotif("error", res.data.Message, "");
        }
      })
      .catch((err) => {
        console.log(err);
        ModalNotif("error", "Simpan Gagal", "Terjadi kesalahan pada sistem!");
        childRef.current?.setStatusModal(false);
      });
  }

  const childRef = useRef<typeRef>(null);

  return (
    <>
      <Modal isOpen={modal} className={"modal_blog"}>
        <ModalHeader toggle={() => onCloseModal()}>
          {aksiModal == "tambah" ? "Tambah" : "Ubah"} Blog
        </ModalHeader>
        <form onSubmit={aksiModal == "tambah" ? tambahBlog : ubahBlog}>
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
            <div className="div_form_group">
              <div className="label_input_blog">
                URL Slug <div className="mandatory">&nbsp;*</div>
              </div>
              <input
                type="text"
                onChange={(e) => setUrlSlug(e.target.value)}
                required
                value={url_slug}
                maxLength={200}
                placeholder={`Gunakan "-" untuk memisahkan kata`}
                className="input_text_blog"
              />
            </div>
            <div className="div_form_group">
              <div className="label_input_blog">
                Kategori <div className="mandatory">&nbsp;*</div>
              </div>
              <select
                name="select"
                onChange={(e) => setKategori(parseInt(e.target.value))}
                className="input_text_blog"
                required
              >
                <option value=""></option>
                {listKategori && listKategori.map((data, index) => (
                  <>
                  <option value={data.id} selected={parseInt(data.id) === kategori}>{data.nama}</option>
                  </>
                ))}
              </select>
            </div>
            <div className="div_form_group input_foto">
              <div>
                <div className="label_input_blog">
                  Foto <div className="mandatory">&nbsp;*</div>
                </div>
                <img
                  src={
                    prevFoto == "" || prevFoto == undefined
                      ? require("../../assets/img/addBg.jpg")
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
                required={aksiModal == "tambah" ? true : false}
              />
            </div>
            <div className="div_form_group">
              <div className="label_input_blog">
                Alt img <div className="mandatory">&nbsp;*</div>
              </div>
              <input
                type="text"
                onChange={(e) => setAltImg(e.target.value)}
                required
                value={alt_img}
                maxLength={200}
                className="input_text_blog"
              />
            </div>
            <div className="div_form_group">
              <div className="label_input_blog">
                Meta desc <div className="mandatory">&nbsp;*</div>
              </div>
              <textarea
                onChange={(e) => setMetaDesc(e.target.value)}
                required
                value={meta_desc}
                // maxLength={200}
                rows={5}
                style={{ width: "100%" }}
                // className="input_text_blog"
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
