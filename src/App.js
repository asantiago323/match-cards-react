import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

import './App.css';

import Board from './Board/Board';
import initializeDeck from './deck';

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [dimension, setDimension] = useState(400);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [counter, setCounter] = useState(0);
  const [solveCounter, setSolveCounter] = useState(0);

  useEffect(() => {
    resizeBoard();
    setCards(initializeDeck());
  }, []);

  useEffect(() => {
    const resizeListener = window.addEventListener('resize', resizeBoard);

    return () => window.addEventListener('resize', resizeListener);
  });

  const handleClick = (id) => {
    setDisabled(true);
    if (flipped.length === 0) {
      setFlipped([id]);
      setDisabled(false);
    } else {
      setSolveCounter( solveCounter + 1);
      if (sameCardClicked(id)) return;
      setFlipped([flipped[0], id]);
      if (isMatch(id)) {
        setCounter(counter + 1);
        setSolved([...solved, flipped[0], id]);
        resetCards();
      } else {
        setTimeout(resetCards, 2000);
      }
    }
  };

  const isMatch = (id) => {
    const clickedCard = cards.find(card => card.id === id);
    const flippedCard = cards.find(card => flipped[0] === card.id);

    return flippedCard.type === clickedCard.type;
  }

  const sameCardClicked = (id) => flipped.includes(id);

  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  }

  const resizeBoard = () => {
    setDimension(
      Math.min(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      )
    )
  };

  const resetBoard = () => {
    resetCards();
    setSolved([]);
    setCounter(0);
    setSolveCounter(0);
  };

  return (
    <div className="App">
      <h2>Can you remember where the cards are?</h2>
      {/* score */}
      
      <Board
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        dimension={dimension}
        disabled={disabled}
        solved={solved} />
        {
          counter === 8 ?
          <div className="actions">
          <Button
            onClick={resetBoard}
            variant="contained"
            color="primary"
            size="small"
          >Reset Board</Button>
          <p>It took you {solveCounter} tries.</p>
          </div> : 
            <div className="actions">
              <p>Total matches found: {counter}</p>
            </div>
        }
    </div>
  );
}

export default App;
