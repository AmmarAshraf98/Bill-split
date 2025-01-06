import { Button } from "./Button";

export function Frind({
  name,
  imgSrc,
  balance,
  frind,
  onSelectFrind,
  selectedFrind,
}) {
  const isSelected = frind.name === selectedFrind?.name;
  return (
    <li>
      <img src={imgSrc} alt={name} />
      <h3> {name}</h3>
      <p className={balance === 0 ? "" : balance > 0 ? "green" : "red"}>
        {balance === 0
          ? `you and your ${name} are even`
          : balance > 0
          ? `${name} owes you ${balance}`
          : `you owe ${name} ${balance}`}
      </p>
      <Button onClick={() => onSelectFrind(frind)}>
        {" "}
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
