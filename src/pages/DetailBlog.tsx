import React, { useEffect, useState, useRef } from "react";

import axios from "axios";

import { Link, useParams } from "react-router-dom";

import dateFormat, { masks } from "dateformat";
import DFormat from "../components/etc/DFormat";

import RSModalSpinner from "../components/etc/RSModalSpinner";

import ReactHtmlParser from "react-html-parser";
const parse = require("html-react-parser");

masks.Waktu = "d mmmm yyyy,HH:MM";

interface detailType {
  judul: string;
  createdAt: string;
  foto: string;
  deskripsi: string;
}

interface typeRef {
  setStatusModal(value: boolean): void;
}

export default function DetailBlog() {
  const [detailBlog, setDetailBlog] = useState<detailType[]>([]);
  const [latestBlog, setLatestBlog] = useState<detailType[]>([]);

  const childRef = useRef<typeRef>(null);

  let { id } = useParams();

  async function getLatestBlog() {
    childRef.current?.setStatusModal(true);

    console.log(id);
    var formData = new FormData();
    formData.append("id", id!);

    await axios
      .post(`${window.config.api}/getlatestblog`, formData)
      .then((res) => {
        console.log(res);
        if (res.data.Error == 0) {
          setLatestBlog(res.data.latestBlog);
        }
        childRef.current?.setStatusModal(false);
      })
      .catch((err) => {
        console.log(err);
        childRef.current?.setStatusModal(false);
      });
  }

  useEffect(() => {
    async function getDetailBlog() {
      childRef.current?.setStatusModal(true);

      console.log(id);
      var formData = new FormData();
      formData.append("id", id!);

      await axios
        .post(`${window.config.api}/getdetailblog`, formData)
        .then((res) => {
          console.log(res);
          if (res.data.Error == 0) {
            setDetailBlog(res.data.detailBlog);
          }
          childRef.current?.setStatusModal(false);
        })
        .catch((err) => {
          console.log(err);
          childRef.current?.setStatusModal(false);
        });
    }

    getDetailBlog();
    getLatestBlog();
  }, [id]);

  function TampilanDetailBlog(
    foto: string,
    judul: string,
    createdAt: string,
    deskripsi: string
  ) {
    return (
      <>
        <div className="div_detail_blog">
          <img alt="img" src={foto} className="img_detail_blog" />
          <div className="judul_detail_blog">{judul}</div>
          <div className="waktu_detail_blog">
            {dateFormat(createdAt, "Waktu")}
          </div>
          <div className="desc_detail_blog">{parse(deskripsi)}</div>
        </div>
      </>
    );
  }

  function TampilanLatestBlog(data: any) {
    return (
      <>
        <div className="div_utama_latestBlog">
          <div className="div_title_lastBlog">LATEST BLOG</div>
          {data &&
            data.map((d: any, i: number) => (
              <React.Fragment key={i}>
                <Link className="link_latestBlog" to={`/blog/${d.id}`}>
                  <div
                    className="div_card_latestBlog"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    <img
                      src={d.foto}
                      className="img_card_latestBlog"
                      alt="img"
                    />
                    <div className="div_judul_latestBlog">{d.judul}</div>
                  </div>
                </Link>
              </React.Fragment>
            ))}{" "}
        </div>
      </>
    );
  }

  DFormat("id");
  return (
    <>
      <RSModalSpinner ref={childRef} />
      {detailBlog.length == 0 ? (
        <div>
          <h4>Data Tidak Ditemukan</h4>
        </div>
      ) : (
        <>
          <div className="div_detailBlog_utama">
            {TampilanDetailBlog(
              detailBlog[0]["foto"],
              detailBlog[0]["judul"],
              detailBlog[0]["createdAt"],
              detailBlog[0]["deskripsi"]
            )}
            {TampilanLatestBlog(latestBlog)}
          </div>
        </>
      )}
    </>
  );
}
