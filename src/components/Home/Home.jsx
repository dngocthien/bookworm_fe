import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DB_URL } from "../../constants";
import Book from "../Book/Book";

const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [onsale, setOnsale] = useState([]);
  const [recomended, setRecomended] = useState(true);
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
    fetch(DB_URL + "books")
      .then((res) => res.json())
      .then((result) => {
        setBooks(result);
        setOnsale(result);
      });
  }, []);
  return (
    <div className="outlet">
      <br />
      <div className="frame-space">
        <h1>On Sale</h1>
        <button className="btn-grey" onClick={() => navigate("/shop")}>
          View All &#9654;
        </button>
      </div>

      <Slider {...settings2}>
        {onsale.slice(0, 8).map((b, index) => {
          return <Book key={index} book={b} />;
        })}
      </Slider>

      <br />
      <br />

      <div className="frame-center">
        <h1>Featured Books</h1>
        <div>
          <button
            className={recomended ? "btn-light" : "btn-white"}
            onClick={() => setRecomended(true)}
          >
            Recomended
          </button>
          <button
            className={recomended ? "btn-white" : "btn-light"}
            onClick={() => setRecomended(false)}
          >
            Popular
          </button>
        </div>
      </div>

      <br />

      <div className="content">
        {books.slice(0, 8).map((b, index) => {
          return <Book key={index} book={b} />;
        })}
      </div>
    </div>
  );
};

export default Home;
