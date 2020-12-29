import React from 'react';

import './Board.css';
import Card from '../Card/Card';

export default function Board({
    cards, flipped, handleClick, dimension, disabled, solved
}) {
    return (
        <div className="board">
            {cards.map((card) => (
                <Card
                    key={card.id}
                    id={card.id}
                    type={card.type}
                    width={dimension / 4.5}
                    height={dimension / 4.5}
                    flipped={flipped.includes(card.id)}
                    handleClick={handleClick}
                    disabled={disabled || solved.includes(card.id)}
                    solved={solved.includes(card.id)} />
            ))}
        </div>
    );
};
