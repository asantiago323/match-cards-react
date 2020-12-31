import React from 'react';

import './Card.css';

export default function Card({
    handleClick,
    id,
    type,
    flipped,
    height,
    width,
    disabled,
    solved
}) {
    return <div
        className={`flip-container ${flipped ? 'flipped' : ''}`}
        style={{
            width, height
        }}
        onClick={() => disabled ? null :  handleClick(id)}>
            <div className="flipper">
                <img
                    style={{
                        height, width
                    }}
                    className={flipped ? 'front' : 'back'}
                    src={flipped || solved ? `/images/${type}.jpg` : `/images/scout-logo.jpg`}
                    alt="card" />
            </div>
        </div>
};
