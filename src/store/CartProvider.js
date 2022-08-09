import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  console.log("cartReducer called with action type: " + action.type);
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingItem = state.items[existingItemIndex];

    let updatedItems;
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    console.log("updatedTotalAmount:" + updatedTotalAmount);

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

  console.log("cartState.totalAmount:" + cartState.totalAmount);

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
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
