import { createStore } from "redux";

const reducer = (state = { email: null, auth: false, cart: [] }, action) => {
  switch (action.type) {
    case "MAIL":
      return { auth: state.auth, email: action.email, cart: state.cart };
    case "AUTH": //is open login/sign in pop-up
      return { auth: action.auth, email: state.email, cart: state.cart };
    case "PUT_CART":
      return { auth: state.auth, email: state.email, cart: action.cart };
  }
  return state;
};

const store = createStore(reducer);
export default store;
