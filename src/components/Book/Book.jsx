import React from "react";
import "./Book.css";

const Book = ({ book }) => {
  return (
    <div className="book">
      <img src={book.bookCoverPhoto} />

      <div className="book-title">
        <h3>{book.bookTitle}</h3>
        <p>{book.author.authorName}</p>
      </div>

      <p className="book-price">
        <b>${book.bookPrice}</b>
      </p>
    </div>
  );
};

export default Book;
