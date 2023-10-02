import React, { useEffect, useState, useRef } from "react";

import axios from "axios";
import { Helmet } from "react-helmet-async";

import { Link, useParams, useNavigate } from "react-router-dom";

import dateFormat, { masks } from "dateformat";
import DFormat from "../components/etc/DFormat";

import RSModalSpinner from "../components/etc/RSModalSpinner";

import { useTimer } from "react-timer-hook";

import ReactHtmlParser from "react-html-parser";
import SideAd from "../components/content/SideAdd";
const parse = require("html-react-parser");

masks.Waktu = "d mmmm yyyy,HH:MM";

interface detailType {
  id: string;
  judul: string;
  createdAt: string;
  foto: string;
  deskripsi: string;
  meta_desc: string;
  alt_img: string;
}

interface typeRef {
  setStatusModal(value: boolean): void;
}

export default function DetailBlog() {
  const [detailBlog, setDetailBlog] = useState<detailType[]>([]);
  const [latestBlog, setLatestBlog] = useState<detailType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [timerAds, setTimerAds] = useState<number>();
  const [pages, setPages] = useState<number>();

  const childRef = useRef<typeRef>(null);

  let { url_slug } = useParams();

  async function getLatestBlog() {
    childRef.current?.setStatusModal(true);

    console.log(url_slug);
    var formData = new FormData();
    formData.append("url_slug", url_slug!);

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

  async function getDetailBlog() {
    childRef.current?.setStatusModal(true);
    setLoading(true);

    console.log(url_slug);
    var formData = new FormData();
    formData.append("url_slug", url_slug!);

    await axios
      .post(`${window.config.api}/getdetailblog`, formData)
      .then((res) => {
        console.log(res);
        if (res.data.Error == 0) {
          setDetailBlog(res.data.detailBlog);
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

  useEffect(() => {
    getDetailBlog();
    getLatestBlog();
  }, [url_slug]);

  function getConfigWebsite2() {
    axios
      .get(`${window.config.api}/getconfigwebsite`)
      .then((res) => {
        console.log(res);
        if (res.data.Error == 0) {
          setTimerAds(res.data.config[0]["timerAds"]);
          setPages(res.data.config[0]["pages"]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getConfigWebsite2();
  }, []);

  function TampilanDetailBlog(
    id: string,
    foto: string,
    judul: string,
    createdAt: string,
    deskripsi: string,
    alt_img: string
  ) {

    const time = new Date();
    time.setSeconds(time.getSeconds() + (timerAds || 10) );

    return (
      <>
        <article className="div_detail_blog">
          <center>
            <img alt={`${alt_img}`} src={foto} className="img_detail_blog" />
          </center>
          <h1 className="judul_detail_blog">{judul}</h1>
          <time dateTime={createdAt} className="waktu_detail_blog">
            {dateFormat(createdAt, "Waktu")}
          </time>
          <p className="desc_detail_blog">{parse(deskripsi)}</p>
          <MyTimer pages={pages} expiryTimestamp={time} id={id} />
        </article>
      </>
    );
  }

  interface propsLatestBlog {
    judul: string;
    foto: string;
    createdAt: string;
    deskripsi: string;
  }

  function TampilanLatestBlog(data: propsLatestBlog[]) {
    return (
      <>
        <aside className="div_utama_latestBlog">
          {data && <div className="div_title_lastBlog">LATEST BLOG</div>}
          {data &&
            data.map((d: any, i: number) => (
              <React.Fragment key={i}>
                <Link className="link_latestBlog" to={`/blog/${d.url_slug}`}>
                  {/* <Link className="link_latestBlog" to={`/blog/${d.id}`}> */}
                  {/* <Link className="link_latestBlog" to={`//nebsefte.net/4/6193035`}> */}

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
          <SideAd />
        </aside>
      </>
    );
  }

  DFormat("id");
  return (
    <>
      <Helmet>
        <title>{detailBlog.length > 0 && detailBlog[0]["judul"]}</title>
        <link
          rel="canonical"
          href={`${window.config.url_front}blog/${url_slug}`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={detailBlog.length > 0 ? detailBlog[0]["judul"] : ""}
        />
        <meta
          property="og:description"
          content={detailBlog.length > 0 ? detailBlog[0]["meta_desc"] : ""}
        />
        <meta
          name="description"
          content={detailBlog.length > 0 ? detailBlog[0]["meta_desc"] : ""}
        />
        <meta
          property="og:image"
          content={detailBlog.length > 0 ? detailBlog[0]["foto"] : ""}
        />
      </Helmet>
      <RSModalSpinner ref={childRef} />
      {loading ? (
        <h5>Loading...</h5>
      ) : detailBlog.length == 0 ? (
        <div>
          <h4>Data Tidak Ditemukan</h4>
        </div>
      ) : (
        <>
          <main className="div_detailBlog_utama">
            {TampilanDetailBlog(
              detailBlog[0]["id"],
              detailBlog[0]["foto"],
              detailBlog[0]["judul"],
              detailBlog[0]["createdAt"],
              detailBlog[0]["deskripsi"],
              detailBlog[0]["alt_img"]
            )}
            {detailBlog.length > 0 && TampilanLatestBlog(latestBlog)}
          </main>
        </>
      )}
    </>
  );
}

function MyTimer({ pages, expiryTimestamp, id }: any) {
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => cekCountdown(),
  });

  const navigate = useNavigate();

  const [code, setCode] = useState<string>("");
  const [buttonNext, setButtonNext] = useState<boolean>(false);

  function cekCountdown() {
    console.log("cekCountdown");

    const pageCount = sessionStorage.getItem("pageCount");
    console.log(pageCount);
    console.log(parseInt(pageCount!));
    if (sessionStorage.getItem("pageCount") == null) {
      sessionStorage.setItem("pageCount", "2");
      setButtonNext(true);
    } else if (parseInt(pageCount!) < pages) {
      const hasil = parseInt(pageCount!) + 1;
      sessionStorage.setItem("pageCount", hasil.toString());
      setButtonNext(true);
    } else {
      getConfigWebsite();
    }
  }

  function getConfigWebsite() {
    axios
      .get(`${window.config.api}/getconfigwebsite`)
      .then((res) => {
        console.log(res);
        if (res.data.Error == 0) {
          setCode(res.data.config[0]["code"]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {}, [code]);

  function nextPage(id: number) {
    var formData = new FormData();
    formData.append("id", id.toString());

    axios
      .post(`${window.config.api}/getRandomBlog`, formData)
      .then((res) => {
        console.log(res);
        if (res.data.Error == 0) {
          navigate(`/blog/${res.data.blog[0]["url_slug"]}`);
        }
        // childRef.current?.setStatusModal(false);
      })
      .catch((err) => {
        console.log(err);
        // childRef.current?.setStatusModal(false);
      });
  }

  return (
    <div className="div-timer">
      {code !== "" ? (
        <>
          <div>Code : {code}</div>
        </>
      ) : (
        <>
          <div>
            {buttonNext == false && (
              <>
                <div>
                  Page {sessionStorage.getItem("pageCount") || 1}/{pages}
                </div>
                <span>{seconds}</span>
              </>
            )}
            {buttonNext && (
              <button className="btn_front" onClick={() => nextPage(id)}>Next Page</button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// function MyTimer({ expiryTimestamp }: any) {
//   const {
//     totalSeconds,
//     seconds,
//     minutes,
//     hours,
//     days,
//     isRunning,
//     start,
//     pause,
//     resume,
//     restart,
//   } = useTimer({
//     expiryTimestamp,
//     onExpire: () => console.warn("onExpire called"),
//   });

//   return (
//     <div style={{ textAlign: "center" }}>
//       {/* <h1>react-timer-hook </h1>
//       <p>Timer Demo</p> */}
//       <div style={{ fontSize: "30px" }}>
//         {/* <span>{days}</span>:
//         <span>{hours}</span>: */}
//         <span>{minutes}</span>:
//         <span>{seconds}</span>
//       </div>
//       {/* <p>{isRunning ? "Running" : "Not running"}</p>
//       <button onClick={start}>Start</button>
//       <button onClick={pause}>Pause</button>
//       <button onClick={resume}>Resume</button> */}
//       {/* <button
//         onClick={() => {
//           // Restarts to 5 minutes timer
//           const time = new Date();
//           time.setSeconds(time.getSeconds() + 300);
//           restart(time);
//         }}
//       >
//         Restart
//       </button> */}
//     </div>
//   );
// }
