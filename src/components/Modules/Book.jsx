import React from "react";
import { Link } from "react-router-dom";
import model from "../../assets/model.jpeg";
import "./Module.css";

const Book = ({ book }) => {
  console.log(book);
  return (
    <Link className="link" to={`/shop/${book.id}`} book={book}>
      <div className="book">
        <img src={book.bookCoverPhoto != "" ? book.bookCoverPhoto : model} />

        <div className="book-title">
          <h3>{book.bookTitle}</h3>
          <p>{book.author.authorName}</p>
        </div>

        <p className="book-price">
          {book.discount != null ? (
            <>
              <del>${book.bookPrice}</del>
              <b> ${book.discount.discountPrice}</b>
            </>
          ) : (
            <b>${book.bookPrice} </b>
          )}
        </p>
      </div>
    </Link>
  );
};

export default Book;
