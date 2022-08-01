import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DB_URL } from "../../constants";
import "./Detail.css";

const Detail = () => {
  let { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(DB_URL + "books/id/" + id)
      .then((res) => res.json())
      .then((result) => {
        setBook(result);
        console.log(result);
      });
  }, []);
  return (
    <div className="outlet">
      {book != null ? (
        <>
          <h1>{book.category.categoryName}</h1>
          <hr />

          <div className="frame-flex">
            <div className="frame-big">
              <div className="column-left text-right">
                <img src={book.bookCoverPhoto} />
                <p>By (author) {book.author.authorName}</p>
              </div>
              <div className="column-left">
                <h3>{book.bookTitle}</h3>
                <p>{book.bookSummary}</p>
              </div>
            </div>

            <div className="frame-small">
              <div className="frame-small-head">
                <p>${book.bookPrice}</p>
              </div>
              <div className="frame-small-body">
                <p>Quantity</p>
                <div className="quantity">
                  <p className="quantity-volumn">-</p>
                  <p>1</p>
                  <p className="quantity-volumn text-right">+</p>
                </div>

                <div className="quantity-add">Add to cart</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Detail;
