import { createStore } from "redux";

const reducer = (state = { userr: null, auth: false, cart: [] }, action) => {
  switch (action.type) {
    case "USERR":
      return { auth: state.auth, userr: action.userr, cart: state.cart };
    case "AUTH": //is open login/sign in pop-up
      return { auth: action.auth, userr: state.userr, cart: state.cart };
    case "PUT_CART":
      return { auth: state.auth, userr: state.userr, cart: action.cart };
  }
  return state;
};

const store = createStore(reducer);
export default store;
