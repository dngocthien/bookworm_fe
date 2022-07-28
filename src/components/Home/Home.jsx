import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DB_URL } from "../../constants";
import Book from "../Book/Book";

const Home = () => {
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
    fetch(DB_URL + "books")
      .then((res) => res.json())
      .then((result) => {
        setOnsale(result);
      });
  }, []);
  return (
    <div className="outlet">
      <div className="header">
        <p>On Sale</p>
        <button className="btn-grey">View All &#9654;</button>
      </div>

      <Slider {...settings2}>
        {onsale.slice(0, 8).map((b, index) => {
          return <Book key={index} book={b} />;
        })}
      </Slider>
    </div>
  );
};

export default Home;
