import { useState } from "react";
import ReacrDOM from "react-dom/client";
import "./index.css";
import { FrindesList } from "./Component/FrindList";
import { Button } from "./Component/Button";
import { FormSplitBill } from "./Component/FormSplitBill";
import { FormAddFrind } from "./Component/FormAddFrind";

// initial data
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?=1736115762855",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [addForm, setAddForm] = useState(false);

  const [selectedFrind, setSelectedFrind] = useState(null);

  const [frinds, setFrinds] = useState(initialFriends);

  // Show & hide Add form
  function handleForm() {
    if (selectedFrind) return;
    setAddForm((prev) => !prev);
  }

  function addFrind(newFrind) {
    setFrinds((frinds) => [...frinds, newFrind]);
    // close form after adding
    handleForm();
  }

  function handleSelectedFrind(selected) {
    // default
    // setSelectedFrind(selected);

    // to close with the same button which open
    setSelectedFrind((cur) => (cur?.id === selected?.id ? null : selected));
    setAddForm(false);
  }

  function handleBillSplit(value) {
    setFrinds((frindes) =>
      frindes.map((frind) =>
        frind.id === selectedFrind.id
          ? { ...frind, balance: frind.balance + value }
          : frind
      )
    );

    // Close select form
    setSelectedFrind(null);
  }

  return (
    <div className='app'>
      <aside className='sidebar'>
        <FrindesList
          frinds={frinds}
          onSelectFrind={handleSelectedFrind}
          selectedFrind={selectedFrind}
        />

        {addForm && <FormAddFrind onAdd={addFrind} />}

        {/* use only one button for show and hide */}
        <Button onClick={handleForm}>{addForm ? "Close" : "Add form"}</Button>

        {/* instead use two button */}
        {/* {addForm && <Button onToggleForm={handleForm}>close</Button>} */}
      </aside>

      {selectedFrind && (
        <FormSplitBill frind={selectedFrind} onSplit={handleBillSplit} />
      )}
    </div>
  );
}

// Button
// function Button({ children, onClick }) {
//   return (
//     <button className='button' onClick={onClick}>
//       {children}
//     </button>
//   );
// }

// frindlist
// function FrindesList({ frinds, onSelectFrind, selectedFrind }) {
//   return (
//     <ul>
//       {frinds.map((frind) => (
//         <Frind
//           frind={frind}
//           name={frind.name}
//           imgSrc={frind.image}
//           balance={frind.balance}
//           key={frind.id}
//           onSelectFrind={onSelectFrind}
//           selectedFrind={selectedFrind}
//         />
//       ))}
//     </ul>
//   );
// }

// one frind
// function Frind({ name, imgSrc, balance, frind, onSelectFrind, selectedFrind }) {
//   const isSelected = frind.name === selectedFrind?.name;
//   return (
//     <li>
//       <img src={imgSrc} alt={name} />
//       <h3> {name}</h3>
//       <p className={balance === 0 ? "" : balance > 0 ? "green" : "red"}>
//         {balance === 0
//           ? `you and your ${name} are even`
//           : balance > 0
//           ? `${name} owes you ${balance}`
//           : `you owe ${name} ${balance}`}
//       </p>
//       <Button onClick={() => onSelectFrind(frind)}>
//         {" "}
//         {isSelected ? "Close" : "Select"}
//       </Button>
//     </li>
//   );
// }

// Form Add Frind
// function FormAddFrind({ onAdd }) {
//   const [fNAme, setName] = useState("");
//   const [imgSrc, setImg] = useState("https://i.pravatar.cc/48");

//   function handleName({ target }) {
//     setName(target.value);
//   }

//   function handleImg({ target }) {
//     setImg(target.value);
//   }

//   // add new frind
//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!fNAme && !imgSrc) return;
//     const id = new Date().getTime();

//     const newFrind = {
//       id,
//       name: fNAme,
//       image: `${imgSrc}?=${id}`,
//       balance: 0,
//     };

//     onAdd(newFrind);
//     // clear
//     setImg("https://i.pravatar.cc/48");
//     setName("");

//     // close add form
//   }

//   return (
//     <form className='form-add-friend' onSubmit={handleSubmit}>
//       <label htmlFor='frind-name'>👬 Name</label>
//       <input value={fNAme} onChange={handleName} type='text' id='frind-name' />

//       <label htmlFor='img'>🐱‍👤 Image </label>
//       <input value={imgSrc} onChange={handleImg} type='text' />

//       <Button>Add</Button>
//     </form>
//   );
// }

// Bill Form
// function FormSplitBill({ frind, onSplit }) {
//   const { name, balance } = frind;

//   const [bilValue, setbilValue] = useState("");
//   const [userExpense, setUserExpense] = useState("");
//   const [whoPpay, setWhoPpay] = useState("user");
//   const frindExpense = bilValue ? bilValue - userExpense : "";

//   function handleBilValue({ target }) {
//     setbilValue(Number(target.value));
//   }

//   function handleUserExpense({ target }) {
//     setUserExpense(Number(target.value));
//   }

//   function handleWhoPay({ target }) {
//     setWhoPpay(target.value);
//   }

//   // handle Bill Form
//   function handleForm(e) {
//     e.preventDefault();

//     if (!bilValue || !userExpense) return;

//     onSplit(whoPpay === "user" ? frindExpense : -userExpense);
//     // clear from
//     setbilValue("");
//     setUserExpense("");
//   }

//   return (
//     <form className='form-split-bill' onSubmit={handleForm}>
//       <h2>Split a bill with {name}</h2>

//       <label htmlFor='billValue'>💰 Bill value</label>
//       <input
//         value={bilValue}
//         onChange={handleBilValue}
//         type='number'
//         id='billValue'
//       />

//       <label htmlFor='yourExpense'>😒 your expense</label>
//       <input
//         value={userExpense}
//         onChange={handleUserExpense}
//         type='number'
//         id='yourExpense'
//       />

//       <label htmlFor='frindExpense'>👬 {name} expense</label>
//       <input type='number' value={frindExpense} id='frindExpense' disabled />

//       <label htmlFor='whoPay'>🤑 Who is paying the bill</label>
//       <select value={whoPpay} onChange={handleWhoPay} type='number' id='whoPay'>
//         <option value='user'>You</option>
//         <option value='frind'>{name}</option>
//       </select>

//       <Button>Split bill</Button>
//     </form>
//   );
// }

const root = ReacrDOM.createRoot(document.getElementById("root"));
root.render(<App />);
