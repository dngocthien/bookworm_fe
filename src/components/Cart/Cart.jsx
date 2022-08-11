import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState(useSelector((state) => state.cart) ?? []);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch({ type: "PUT_CART", cart: cart });
    // setTotal(sum());
  }, [cart]);

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
      <h1>Your cart: {cart.length} items</h1>
      <hr />
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
                        <img src={b.book.bookCoverPhoto} />
                      </td>
                      <td>{b.book.bookTitle}</td>

                      <td className="cart-quantity">
                        <p
                          className="cart-quantity-volumn"
                          onClick={() => updateQuantity(index, -1)}
                        >
                          -
                        </p>
                        <p className="cart-quantity-number">{b.quantity}</p>
                        <p
                          className="cart-quantity-volumn"
                          onClick={() => updateQuantity(index, 1)}
                        >
                          +
                        </p>
                      </td>

                      <td>{b.quantity}</td>
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
            <h3>{total}</h3>
            <p className="btn-post">Place order</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
