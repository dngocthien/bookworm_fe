import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "react-bootstrap";
import Select from "react-select";
import { DB_URL } from "../../constants";
import "./Detail.css";
import Review from "../Modules/Review";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [reviewPage, setReviewPage] = useState(null);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(5);
  const [star, setStar] = useState(0);
  const [sort, setSort] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDetails, setReviewDetails] = useState("");
  const [ratingStar, setRatingStar] = useState(1);
  const [posted, setPosted] = useState(false);
  const rating = [
    { label: "1 Star", value: 1 },
    { label: "2 Star", value: 2 },
    { label: "3 Star", value: 3 },
    { label: "4 Star", value: 4 },
    { label: "5 Star", value: 5 },
  ];
  const reviewBy = [
    { label: "Sort by date: newest to oldest", value: 1 },
    { label: "Sort by date: oldest to newest", value: 0 },
  ];
  const shows = [
    { label: "Show 5", value: 5 },
    { label: "Show 15", value: 15 },
    { label: "Show 20", value: 20 },
    { label: "Show 25", value: 25 },
  ];

  useEffect(() => {
    updateBooks();
  }, [page, show, star, sort]);

  let items = [];
  for (let number = 0; number <= totalPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={() => setPage(number)}
      >
        {number + 1}
      </Pagination.Item>
    );
  }

  const updateBooks = () => {
    fetch(DB_URL + "books/id/" + id)
      .then((res) => res.json())
      .then((result) => {
        setBook(result);
      });

    let url =
      "reviews?id=" +
      id +
      "&page=" +
      page +
      "&show=" +
      show +
      "&star=" +
      star +
      "&sort=" +
      sort;
    fetch(DB_URL + url)
      .then((res) => res.json())
      .then((result) => {
        setReviewPage(result);
        setTotalPage(result.totalPage);
      });
  };

  const cart = useSelector((state) => state.cart) ?? [];
  const addToCart = () => {
    let existing = cart.slice();
    let update = [
      ...existing,
      {
        book: book,
        quantity: quantity,
      },
    ];
    dispatch({ type: "PUT_CART", cart: update });
    navigate("/cart");
  };

  const postReview = () => {
    const current = new Date();
    const dto = {
      id: null,
      bookId: id,
      reviewTitle: reviewTitle,
      reviewDetails: reviewDetails,
      reviewDate: current,
      ratingStar: ratingStar,
    };
    fetch(DB_URL + "reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    }).then(() => {
      setReviewTitle("");
      setReviewDetails("");
      updateBooks();
      alert("Your review was posted!");
    });
  };
  return (
    <div className="outlet details">
      {book != null ? (
        <>
          <h1>{book.category.categoryName}</h1>
          <hr />

          <div className="frame-flex ">
            <div className="frame-big column-border">
              {/* <div className="column-border"> */}
              <div className="padding-right text-right">
                <img src={book.bookCoverPhoto} />
                <p>By (author) {book.author.authorName}</p>
              </div>
              <div className="padding-right">
                <h3>{book.bookTitle}</h3>
                <p>{book.bookSummary}</p>
              </div>
            </div>
            <br />

            <div className="frame-small">
              <div className="column-border">
                <div className="frame-small-head">
                  {book.discount != null ? (
                    <>
                      <del>${book.bookPrice}</del>
                      <b> ${book.discount.discountPrice}</b>
                    </>
                  ) : (
                    <b>${book.bookPrice} </b>
                  )}
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

                  <div className="btn-post" onClick={() => addToCart()}>
                    Add to cart
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />

          <div className="frame-flex reviews">
            {/* <div className="frame-big"> */}
            <div className="frame-big frame-flex column-border">
              <h1>Customer Reviews</h1>
              {reviewPage != null && reviewPage.reviews.length > 0 ? (
                <div>
                  <h3>{reviewPage.star.toFixed(1)} Star</h3>
                  <p className="txt-small" onClick={() => setPage(0)}>
                    <u onClick={() => setStar(0)}>({reviewPage.totalReview})</u>{" "}
                    |{" "}
                    <u onClick={() => reviewPage.five > 0 && setStar(5)}>
                      5 star ({reviewPage.five})
                    </u>{" "}
                    |{" "}
                    <u onClick={() => reviewPage.four > 0 && setStar(4)}>
                      4 star ({reviewPage.four})
                    </u>{" "}
                    |{" "}
                    <u onClick={() => reviewPage.three > 0 && setStar(3)}>
                      3 star ({reviewPage.three})
                    </u>{" "}
                    |{" "}
                    <u onClick={() => reviewPage.two > 0 && setStar(2)}>
                      2 star ({reviewPage.two})
                    </u>{" "}
                    |{" "}
                    <u onClick={() => reviewPage.one > 0 && setStar(1)}>
                      1 star ({reviewPage.one})
                    </u>
                  </p>
                  <div className="frame-space">
                    <p>
                      Showing {page * show + 1}-
                      {page * show + reviewPage.reviews.length} of{" "}
                      {reviewPage.totalReview}{" "}
                    </p>
                    <div className="frame-start">
                      <Select
                        className="select"
                        options={reviewBy}
                        placeholder="Sort by date"
                        onChange={(e) => setSort(e.value)}
                      />
                      <Select
                        className="select"
                        options={shows}
                        placeholder="Show 5"
                        onChange={(e) => (setShow(e.value), setPage(0))}
                      />
                    </div>
                  </div>
                  <br />

                  {reviewPage.reviews.map((r, index) => {
                    return <Review key={index} review={r} />;
                  })}
                  <br />
                  <div className="frame-center">
                    <Pagination>
                      <Pagination.Prev
                        onClick={() => setPage(page > 0 ? page - 1 : page)}
                      >
                        Previous
                      </Pagination.Prev>
                      {items}
                      <Pagination.Next
                        onClick={() =>
                          setPage(page < totalPage ? page + 1 : page)
                        }
                      >
                        Next
                      </Pagination.Next>
                    </Pagination>
                  </div>
                </div>
              ) : (
                <p>No review available.</p>
              )}
            </div>
            <br />

            <div className="frame-small">
              <div className="column-border">
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
                    onChange={(e) => setRatingStar(e.value)}
                  />
                </div>
                <hr />
                <div className="frame-small-footer">
                  <p className="btn-post" onClick={() => postReview()}>
                    Submit Review
                  </p>
                </div>
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
