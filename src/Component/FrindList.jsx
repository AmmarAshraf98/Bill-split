import { Frind } from "./Frind";

export function FrindesList({ frinds, onSelectFrind, selectedFrind }) {
  return (
    <ul>
      {frinds.map((frind) => (
        <Frind
          frind={frind}
          name={frind.name}
          imgSrc={frind.image}
          balance={frind.balance}
          key={frind.id}
          onSelectFrind={onSelectFrind}
          selectedFrind={selectedFrind}
        />
      ))}
    </ul>
  );
}
