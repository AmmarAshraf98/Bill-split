import { useState } from "react";
import { Button } from "./Button";
export function FormSplitBill({ frind, onSplit }) {
  const { name, balance } = frind;

  const [bilValue, setbilValue] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const [whoPpay, setWhoPpay] = useState("user");
  const frindExpense = bilValue ? bilValue - userExpense : "";

  function handleBilValue({ target }) {
    setbilValue(Number(target.value));
  }

  function handleUserExpense({ target }) {
    setUserExpense(Number(target.value));
  }

  function handleWhoPay({ target }) {
    setWhoPpay(target.value);
  }

  // handle Bill Form
  function handleForm(e) {
    e.preventDefault();

    if (!bilValue || !userExpense) return;

    onSplit(whoPpay === "user" ? frindExpense : -userExpense);
    // clear from
    setbilValue("");
    setUserExpense("");
  }

  return (
    <form className='form-split-bill' onSubmit={handleForm}>
      <h2>Split a bill with {name}</h2>

      <label htmlFor='billValue'>💰 Bill value</label>
      <input
        value={bilValue}
        onChange={handleBilValue}
        type='number'
        id='billValue'
      />

      <label htmlFor='yourExpense'>😒 your expense</label>
      <input
        value={userExpense}
        onChange={handleUserExpense}
        type='number'
        id='yourExpense'
      />

      <label htmlFor='frindExpense'>👬 {name} expense</label>
      <input type='number' value={frindExpense} id='frindExpense' disabled />

      <label htmlFor='whoPay'>🤑 Who is paying the bill</label>
      <select value={whoPpay} onChange={handleWhoPay} type='number' id='whoPay'>
        <option value='user'>You</option>
        <option value='frind'>{name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
