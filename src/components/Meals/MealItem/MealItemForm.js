import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const inputRef = useRef();

  const [isAmountValid, setIsAmountValid] = useState(true);

  const addItemHandler = (event) => {
    event.preventDefault();

    const enteredAmount = inputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setIsAmountValid(false);
      return;
    }

    props.onAmountEntered(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={addItemHandler}>
      <Input
        label="Amount"
        ref={inputRef}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && (
        <p>Entered amount is not valid. It must be between 1 and 5</p>
      )}
    </form>
  );
};

export default MealItemForm;
