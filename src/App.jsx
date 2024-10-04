import { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState(() => allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      });
    }
    return newDice;
  }

  const diceElements = dice.map((die) => <Die value={die.value} />);

  function rollDice() {
    setDice(() => allNewDice());
  }

  return (
    <main>
      <div className="dices-container">{diceElements}</div>
      <button onClick={rollDice} className="roll-dice">
        Roll Dice
      </button>
    </main>
  );
}

export default App;
