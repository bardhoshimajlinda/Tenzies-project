import Die from "./components/Die";
import Confetti from "react-confetti";
import { useDiceGame } from "./hooks/useDiceGame";

function App() {
  const { dice, tenzies, rollCount, rollDice, holdDice } = useDiceGame();

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
        <br /> Click each die to freeze at its current value between rolls.
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
