import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState(useSelector((state) => state.cart) ?? []);

  useEffect(() => {
    dispatch({ type: "PUT_CART", cart: cart });
  }, [cart]);

  const count = () => {
    let sum = 0;
    cart.map((b) => {
      sum += b.quantity;
    });
    return sum;
  };
  const getTotal = (b) => {
    let total =
      b.book.discount != null
        ? b.book.discount.discountPrice
        : b.book.bookPrice;
    return total * b.quantity;
  };
  const getCartTotals = () => {
    let cartTotals = 0;
    cart.map((b) => {
      cartTotals += getTotal(b);
    });
    return cartTotals;
  };

  const updateCart = (name, price, quantity) => {
    let existing = cart.slice();
    let update = [...existing, [name, price, quantity]];
    return setCart(update);
  };

  const remove = (index) => {
    let existing = cart.slice();
    existing.splice(index, 1);
    return setCart(existing);
  };

  function updateQuantity(index, val) {
    let existing = cart.slice();
    let newVal = existing[index].quantity + val;
    if (newVal > 0 && newVal <= 8) existing[index].quantity = newVal;
    if (newVal < 1) existing.splice(index, 1);
    setCart(existing);
  }
  return (
    <div className="outlet cart">
      <h1>Your cart: {count()} items</h1>
      <hr />
      {cart.length > 0 ? (
        <div className="frame-flex">
          <div className="frame-big">
            <div className="column-border">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((b, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="frame-start">
                            <img src={b.book.bookCoverPhoto} />
                            <div>
                              <h1>{b.book.bookTitle}</h1>
                              <p>{b.book.author.authorName}</p>
                            </div>
                          </div>
                        </td>

                        <td>
                          {b.book.discount != null ? (
                            <div className="frame-row">
                              <h1> ${b.book.discount.discountPrice}</h1>
                              <del>${b.book.bookPrice}</del>
                            </div>
                          ) : (
                            <b>${b.book.bookPrice} </b>
                          )}
                        </td>

                        <td>
                          <div className="frame-flex">
                            <p
                              className="cart-volumn"
                              onClick={() => updateQuantity(index, -1)}
                            >
                              -
                            </p>
                            <p className="cart-number">{b.quantity}</p>
                            <p
                              className="cart-volumn"
                              onClick={() => updateQuantity(index, 1)}
                            >
                              +
                            </p>
                          </div>
                        </td>

                        <td>
                          <h1>${getTotal(b)}</h1>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="frame-small">
            <div className="column-border">
              <table>
                <thead>
                  <tr>
                    <th>Cart Totals</th>
                  </tr>
                </thead>
              </table>
              <h3>${getCartTotals()}</h3>
              <p className="btn-post">Place order</p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Cart;
