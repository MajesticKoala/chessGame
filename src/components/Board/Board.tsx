import './Board.scss';

import React from 'react'
import Tile from '../Tile/Tile';

export default function Board() {
    let board = [];
    const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

    for (let i = 0; i < 64; i++) {
        const number = (i );
        if (i === 12) {
            board.push(<Tile key={i} number={number} piece={'bp'}/>);
        } else {
            board.push(<Tile key={i} number={number}/>);
        }
    }

    return (
        <div className="board">
            {board}
        </div>
    )
}
