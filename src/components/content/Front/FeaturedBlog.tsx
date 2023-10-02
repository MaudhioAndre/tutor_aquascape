import { useState, useEffect, useRef } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import RSModalSpinner from "../../etc/RSModalSpinner";
import { blogType } from "../../../pages/BlogAdmin";

import dateFormat, { masks } from "dateformat";
import DFormat from "../../../components/etc/DFormat";

import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

interface typeRef {
  setStatusModal(value: boolean): void;
}

export default function FeaturedBlog() {
  const [blog, setBlog] = useState<blogType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const childRef = useRef<typeRef>(null);

  function getBlogFrontFeatured() {
    childRef.current?.setStatusModal(true);
    setLoading(true);

    axios
      .get(`${window.config.api}/getblogfrontfeatured`)
      .then((res) => {
        console.log(res);
        if (res.data.Error == 0) {
          setBlog(res.data.blog);
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
    getBlogFrontFeatured();
  }, []);

  DFormat("id");

  return (
    <div>
      <>
        <div className="div_featured_blog">
          {windowWidth > 768 ? BlogGrid(blog) : BlogSlider(blog)}
        </div>

        <RSModalSpinner ref={childRef} />
      </>
    </div>
  );
}

function BlogGrid(blog: blogType[]) {
  return (
    <>
      {blog &&
        blog.map((data, index) => (
          <Link
            to={`/blog/${data.url_slug}`}
            // to={`blog/${data.url_slug}`}
            style={{
              backgroundImage: `linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.7)), url(${data.foto})`,
              width: "100%",
            }}
            className={`link_card_featured_blog df-${index + 1}`}
          >
            <div className="card_featured_blog">
              <div className="judul_featured_blog">{data.judul}</div>
              <div className="tgl_featured_blog">
                {dateFormat(data.createdAt, "Waktu")}
              </div>
            </div>
          </Link>
        ))}
    </>
  );
}

function BlogSlider(blog: blogType[]) {
  return (
    <div className="slide-container">
      <Slide transitionDuration={700}>
        {blog &&
          blog.map((data, index) => (
            <Link
            to={`/blog/${data.url_slug}`}
            style={{textDecoration:'none'}}
            key={index}
            >
              <div
                className="BlogSliderDivImg"
                style={{
                  backgroundImage: `linear-gradient(180deg, transparent, rgba(0, 0, 0, .7)), url(${data.foto})`,
                }}
              >
                <span className="BlogSliderSpanJudul">{data.judul}</span>
              </div>
            </Link>
          ))}
      </Slide>
    </div>
  );
}
