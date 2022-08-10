import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DB_URL } from "../../constants";
import Book from "../Modules/Book";

const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [sort, setSort] = useState(1);
  const [onsale, setOnsale] = useState([]);
  var settings2 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 595,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    fetch(DB_URL + "books?page=0&show=8&filter=0&type=0&sort=0")
      .then((res) => res.json())
      .then((result) => {
        if (result.books != undefined) {
          setOnsale(result.books);
        }
      });
  }, [sort]);
  useEffect(() => {
    fetch(DB_URL + "books?page=0&show=8&filter=0&type=0&sort=" + sort)
      .then((res) => res.json())
      .then((result) => {
        if (result.books != undefined) {
          setBooks(result.books);
        }
      });
  }, [sort]);
  return (
    <div className="outlet">
      <br />
      <div className="frame-space">
        <h2>On Sale</h2>
        <button className="btn-grey" onClick={() => navigate("/shop")}>
          View All &#9654;
        </button>
      </div>

      <Slider {...settings2}>
        {onsale.length > 0 ? (
          onsale.map((b, index) => {
            return <Book key={index} book={b} />;
          })
        ) : (
          <></>
        )}
      </Slider>

      <br />
      <br />
      <br />

      <div className="frame-text_center">
        <h2>Featured Books</h2>
        <br />
        <div>
          <button
            className={sort == 1 ? "btn-light" : "btn-white"}
            onClick={() => setSort(1)}
          >
            Recomended
          </button>
          <button
            className={sort == 2 ? "btn-light" : "btn-white"}
            onClick={() => setSort(2)}
          >
            Popular
          </button>
        </div>
      </div>

      <br />

      <div className="content">
        {books.length > 0 ? (
          books.map((b, index) => {
            return <Book key={index} book={b} />;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Home;
