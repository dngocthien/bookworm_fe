import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { DB_URL } from "../../constants";
import "./Detail.css";

const Detail = () => {
  let { id } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDetails, setReviewDetails] = useState("");
  const [star, setStar] = useState(1);
  const rating = [
    { label: "1 Star", value: 1 },
    { label: "2 Star", value: 2 },
    { label: "3 Star", value: 3 },
    { label: "4 Star", value: 4 },
    { label: "5 Star", value: 5 },
  ];

  useEffect(() => {
    fetch(DB_URL + "books/id/" + id)
      .then((res) => res.json())
      .then((result) => {
        setBook(result);
      });
  }, []);
  return (
    <div className="outlet shop">
      {book != null ? (
        <>
          <h1>{book.category.categoryName}</h1>
          <hr />

          <div className="frame-flex details">
            <div className="frame-big">
              <div className="column-left text-right">
                <img src={book.bookCoverPhoto} />
                <p>By (author) {book.author.authorName}</p>
              </div>
              <div className="column-right">
                <h3>{book.bookTitle}</h3>
                <p>{book.bookSummary}</p>
              </div>
            </div>

            <br />

            <div className="frame-small">
              <div className="frame-small-head">
                <p>${book.bookPrice}</p>
              </div>
              <div className="frame-small-body">
                <p>Quantity</p>
                <div className="quantity">
                  <p
                    className="quantity-volumn"
                    onClick={() =>
                      setQuantity(quantity > 1 ? quantity - 1 : quantity)
                    }
                  >
                    -
                  </p>
                  <p>{quantity}</p>
                  <p
                    className="quantity-volumn text-right"
                    onClick={() =>
                      setQuantity(quantity < 8 ? quantity + 1 : quantity)
                    }
                  >
                    +
                  </p>
                </div>

                <div className="quantity-add">Add to cart</div>
              </div>
            </div>
          </div>

          <br />

          <div className="frame-flex reviews">
            <div className="frame-big">
              <h3>Customer Reviews</h3>
            </div>
            <br />
            <div className="frame-small">
              <h3>Write a review</h3>
              <hr />

              <div className="frame-small-body">
                <p>Add a titile</p>
                <input onChange={(e) => setReviewTitle(e.target.value)} />
                <br />
                <br />

                <p>Details please! Your review helps other shopers.</p>
                <textarea onChange={(e) => setReviewDetails(e.target.value)} />
                <br />
                <br />

                <p>Select a rating star</p>
                <Select
                  options={rating}
                  onChange={(e) => setStar(e.value)}
                ></Select>
              </div>
              <hr />
              <div className="frame-small-footer">
                <p
                  onClick={() =>
                    console.log(
                      "title:" +
                        reviewTitle +
                        ";details:" +
                        reviewDetails +
                        ";start:" +
                        star
                    )
                  }
                >
                  Submit Review
                </p>
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
