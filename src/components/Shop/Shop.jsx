import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import Select from "react-select";
import Book from "../Book/Book";
import { DB_URL } from "../../constants";

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [filterName, setFilterName] = useState("");
  const [filterId, setFilterId] = useState(0);
  const [filterType, setFilterType] = useState(0);
  const [sort, setSort] = useState("");
  const [show, setShow] = useState(5);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [totalBook, setTotalBook] = useState(1);

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
      });
  }, []);
  useEffect(() => {
    let url =
      "books?page=" +
      page +
      "&show=" +
      show +
      "&filter=" +
      filterId +
      "&type=" +
      filterType;
    if (sort != "") {
      url = url + "&sort=" + sort;
    }
    fetch(DB_URL + url)
      .then((res) => res.json())
      .then((result) => {
        setBooks(result.books);
        setTotalPage(result.totalPage);
        setTotalBook(result.totalBook);
      });
  }, [filterId, sort, show, page]);

  return (
    <div className="outlet">
      <div className="frame-start">
        <h1>Books</h1>
        {filterName != "" ? <p>(Filter by {filterName})</p> : <></>}
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
                  onClick={() => (
                    setFilterName(c.categoryName),
                    setFilterId(c.id),
                    setFilterType(1),
                    setPage(0)
                  )}
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
                  onClick={() => (
                    setFilterName(a.authorName),
                    setFilterId(a.id),
                    setFilterType(2),
                    setPage(0)
                  )}
                >
                  {a.authorName}
                </p>
              );
            })}
          </div>
          <div className="border">
            <h4>Rating Review</h4>
            {rating.map((r, index) => {
              return <p key={index}>{r.label}</p>;
            })}
          </div>
        </div>

        <div className="main">
          <div className="frame-space">
            <p>
              Showing {page * show + 1}-{page * show + books.length} of{" "}
              {totalBook}
            </p>
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
                placeholder="Show 5"
                onChange={(e) => (setShow(e.value), setPage(0))}
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

          <br />

          <div className="frame-center">
            <Pagination>
              <Pagination.Prev
                onClick={() => setPage(page > 0 ? page - 1 : page)}
              />
              {items}
              <Pagination.Next
                onClick={() => setPage(page < totalPage ? page + 1 : page)}
              />
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
