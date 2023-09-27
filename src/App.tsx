import React, { useEffect, useState } from "react";
import "./App.css";

type userType = {};

interface QueueItem {
  items: number | undefined; // Define the type of items here
}

function App() {
  const [itemsInPersonCart, setItemsInPersonCart] = useState<number | string>(
    ""
  );
  const [lines, setLines] = useState([[1, 5, 10], [3], [6], [1], [2]]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prevLines) =>
        prevLines.map((line) =>
          [line[0] - 1, ...line.slice(1)].filter((value) => value > 0)
        )
      );
      console.log(lines);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setItemsInPersonCart(Number(event.target.value));
    console.log(itemsInPersonCart);
  }

  function addPersonToLine(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setItemsInPersonCart("");
    if (itemsInPersonCart) {
      //TODO - Loop through the lines and find the one with least items
      let leastItemAmount = 1e9;
      let lineWithLeastItems: number[] | undefined = undefined;

      for (let line of lines) {
        const totalItemsInLine = line.reduce((sum, curr) => sum + curr, 0);

        if (totalItemsInLine < leastItemAmount) {
          leastItemAmount = totalItemsInLine;
          lineWithLeastItems = line;
        }
      }

      if (!lineWithLeastItems) return;
      if (typeof itemsInPersonCart === "number") {
        setLines((prevLines) =>
          prevLines.map((line) =>
            line === lineWithLeastItems ? [...line, itemsInPersonCart] : line
          )
        );
      }
    }
  }

  function setItemsCountdown() {
    let updatedLines = [...lines];

    setTimeout(() => {
      for (let i = 0; i < lines.length; i++) {
        updatedLines[i][0] = lines[i][0] - 1;
      }
      console.log(updatedLines);
      setLines(updatedLines);
    }, 5000);
  }

  return (
    <div className="App">
      <form onSubmit={addPersonToLine}>
        <input
          type="number"
          max={10}
          value={itemsInPersonCart}
          onChange={handleInputChange}
        />
        <button>Checkout</button>
      </form>

      <div className="queue-container">
        {lines.map((_, index) => (
          <div className="queue" key={index}>{`Line: ${index}`}</div>
        ))}
        {lines.map((queue, index) => (
          <div key={index}>
            {queue.map((item, index) => (
              <p className="person" key={index}>
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
