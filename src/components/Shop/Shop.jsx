import React, { useEffect, useState } from "react";
import Select from "react-select";
import Book from "../Book/Book";
import { DB_URL } from "../../constants";

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [url, setUrl] = useState("books");
  const [filter, setFilter] = useState("");

  const [show, setShow] = useState(15);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const rating = [
    { label: "1 Star", value: 1 },
    { label: "2 Star", value: 2 },
    { label: "3 Star", value: 3 },
    { label: "4 Star", value: 4 },
    { label: "5 Star", value: 5 },
  ];
  const sorts = [
    { label: "Sort by on sale", value: 1 },
    { label: "Sort by popularity", value: 2 },
    { label: "Sort by price: low to high", value: 3 },
    { label: "Sort by price: high to low", value: 4 },
  ];
  const shows = [
    { label: "Show 5", value: 5 },
    { label: "Show 15", value: 15 },
    { label: "Show 20", value: 20 },
    { label: "Show 25", value: 25 },
  ];

  useEffect(() => {
    fetch(DB_URL + "categories")
      .then((res) => res.json())
      .then((result) => {
        setCategories(result);
      });
    fetch(DB_URL + "authors")
      .then((res) => res.json())
      .then((result) => {
        setAuthors(result);
        console.log(result);
      });
  }, []);
  useEffect(() => {
    fetch(DB_URL + url)
      .then((res) => res.json())
      .then((result) => {
        setBooks(result);
      });
  }, [url]);

  // const changePage = () => {
  //   setUrl("books/page?page=1&show=5")
  // };
  return (
    <div className="outlet">
      <div className="frame-start">
        <h1>Books</h1>
        {url != "books" ? <p>(Filter by {filter})</p> : <></>}
      </div>

      <hr />
      <br />

      <div className="frame-start">
        <div className="sidebar">
          <b>Filter By</b>
          <div className="border">
            <h4>Category</h4>
            {categories.map((c, index) => {
              return (
                <p
                  key={index}
                  onClick={() =>
                    setUrl("books/category/" + c.id, setFilter(c.categoryName))
                  }
                >
                  {c.categoryName}
                </p>
              );
            })}
          </div>
          <div className="border">
            <h4>Authors</h4>
            {authors.map((a, index) => {
              return (
                <p
                  key={index}
                  onClick={() =>
                    setUrl("books/author/" + a.id, setFilter(a.authorName))
                  }
                >
                  {a.authorName}
                </p>
              );
            })}
          </div>
          <div className="border">
            <h4>Rating Review</h4>
            {rating.map((r, index) => {
              return <p>{r.label}</p>;
            })}
          </div>
        </div>

        <div className="main">
          <div className="frame-space">
            <p>Showing ...</p>
            <div className="frame-start">
              <Select
                className="select"
                options={sorts}
                placeholder="Sort by on sale"
                // onChange={(e) => changeBrand(e)}
              />
              <Select
                className="select"
                options={shows}
                placeholder="Show 15"
                onChange={(e) => setShow(e.value)}
              />
            </div>
          </div>

          <br />

          <div className="content">
            {books.length > 0 ? (
              books.slice(0, show).map((b, index) => {
                return <Book key={index} book={b} />;
              })
            ) : (
              <>...</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
