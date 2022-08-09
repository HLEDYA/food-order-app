import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  console.log("cartReducer called with action type: " + action.type);
  if (action.type === "ADD_ITEM") {
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, setCartState] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    setCartState({ type: "ADD_ITEM", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    setCartState({ type: "REMOVE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    amount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
