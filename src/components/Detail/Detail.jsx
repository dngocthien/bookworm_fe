import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { DB_URL } from "../../constants";
import "./Detail.css";
import Review from "../Book/Review";

const Detail = () => {
  let { id } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [reviewPage, setReviewPage] = useState(null);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(5);

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

    let url = "reviews?id=" + id + "&page=" + page + "&show=" + show;
    fetch(DB_URL + url)
      .then((res) => res.json())
      .then((result) => {
        setReviewPage(result);
        console.log(result);
      });
  }, []);

  const postReview = () => {
    const current = new Date();
    const dto = {
      id: null,
      bookId: id,
      reviewTitle: reviewTitle,
      reviewDetails: reviewDetails,
      reviewDate: current,
      ratingStart: star,
    };
    fetch(DB_URL + "reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    }).then(
      () => (
        setReviewTitle(""),
        setReviewDetails(""),
        alert("Your review was posted!")
      )
    );
  };
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

                <div className="btn-post">Add to cart</div>
              </div>
            </div>
          </div>
          <br />

          <div className="frame-flex reviews">
            <div className="frame-big">
              <h1>Customer Reviews</h1>
              {reviewPage != null && reviewPage.reviews.length > 0 ? (
                <div>
                  <h3>{reviewPage.star} Star</h3>
                  <p>
                    5 star ({reviewPage.five}) | 4 star ({reviewPage.four}) | 3
                    star ({reviewPage.three}) | 2 star ({reviewPage.two}) | 1
                    star ({reviewPage.one})
                  </p>
                  <p>
                    Showing {page * show + 1}-
                    {page * show + reviewPage.reviews.length} of{" "}
                    {reviewPage.totalReview}{" "}
                  </p>

                  {reviewPage.reviews.map((r, index) => {
                    return <Review key={index} review={r} />;
                  })}
                </div>
              ) : (
                <p>No review available.</p>
              )}
            </div>
            <br />

            <div className="frame-small">
              <h3>Write a review</h3>
              <hr />
              <div className="frame-small-body">
                <p>Add a title</p>
                <input
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                />
                <br />
                <br />
                <p>Details please! Your review helps other shopers.</p>
                <textarea
                  value={reviewDetails}
                  onChange={(e) => setReviewDetails(e.target.value)}
                />
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
                <p className="btn-post" onClick={() => postReview()}>
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
