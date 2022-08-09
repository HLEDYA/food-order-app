import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

import { useContext } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  console.log(cartCtx.items);
  const numberOfCartItems = cartCtx.items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);
  console.log("numberOfCartItems" + numberOfCartItems);

  return (
    <button className={classes.button} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
