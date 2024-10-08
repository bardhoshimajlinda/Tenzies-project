import { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollCount, setRollCount] = useState(0);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => (die.isHeld ? die : generateNewDie()))
      );
      setRollCount((prevCount) => prevCount + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setRollCount(0);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti className="confetti" />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same.
        <br /> Click each die to freeze at it's current value between rolls.
      </p>
      <div className="score-tracker">
        <h3>Rolls: {rollCount}</h3>
      </div>
      <div className="dices-container">{diceElements}</div>
      <button onClick={rollDice} className="roll-dice">
        {tenzies ? "New Game" : "Roll Dice"}
      </button>
    </main>
  );
}

export default App;
