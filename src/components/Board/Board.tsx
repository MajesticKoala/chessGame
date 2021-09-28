import './Board.scss';

import React, { useRef, useState } from 'react'
import Tile from '../Tile/Tile';

interface Piece {
    tile: number
}


export default function Board() {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [position, setPosition] = useState<String>();
    const [pieces, setPieces] = useState<Piece[]>([]);

    const boardRef = useRef<HTMLDivElement>(null);

    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        const board = boardRef.current;
        if (element.classList.contains("piece") && board) {
            const x = e.clientX - board.offsetLeft - (board.offsetWidth/16);
            const y = e.clientY - board.offsetTop - (board.offsetHeight/16);
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            setActivePiece(element);
        }
    }
    
    function movePiece(e: React.MouseEvent) {
        const board = boardRef.current;
        if (activePiece && board) {
            const minX = 0 - (board.offsetWidth/16)
            const minY = 0 - (board.offsetHeight/16);
            const maxX = board.offsetWidth - (board.offsetWidth/16)
            const maxY = board.offsetHeight - (board.offsetHeight/16);

            const x = e.clientX - board.offsetLeft - (board.offsetWidth/16);
            const y = e.clientY - board.offsetTop - (board.offsetHeight/16);
            activePiece.style.left = `${x}px`;
            activePiece.style.top = `${y}px`;

            activePiece.style.left = (x < minX) ? `${minX}px` : (x > maxX) ? `${maxX}px` : `${x}px`
            activePiece.style.top = (y < minY) ? `${minY}px` : (y > maxY) ? `${maxY}px` : `${y}px`

        }
    }
    function dropPiece(e: React.MouseEvent) {
        if (activePiece) {
            setActivePiece(null);
        }
    }

    function is_numeric_char(c: string) {
        return /\d/.test(c);
    }

    function convertFEN(fen: string) {
        const positions = fen.substr(0,fen.indexOf(' '));
        let formatPos = "";

        for (const c of positions) {
            if (c === '/') {
            } else {
                if (is_numeric_char(c)) {
                    for (let i = 0; i < parseInt(c); i++) {
                        formatPos += "e"
                    }
                } else {
                    formatPos += c;
                }
            }
        }
        return formatPos;
    }

    let board = [];
    const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    setPosition(convertFEN(startingFen));
    //const position = "rnbqkbnrppppppppeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeePPPPPPPPRNBQKBNR"

    const pieceMap: any = {
        b: 'bb',
        k: 'bk',
        n: 'bn',
        p: 'bp',
        q: 'bq',
        r: 'br',
        B: 'wb',
        K: 'wk',
        N: 'wn',
        P: 'wp',
        Q: 'wq',
        R: 'wr'
    }

    for (let i = 0; i < 64; i++) {
        if (position[i] !== 'e') {
            board.push(<Tile key={i} number={i} piece={pieceMap[position[i]]}/>);
        } else {
            board.push(<Tile key={i} number={i}/>);
        }
    }

    return (
        <div 
        onMouseMove={(e) => {movePiece(e)}}
        onMouseDown={e => grabPiece(e)}
        onMouseUp={e => dropPiece(e)}
        className="board"
        ref={boardRef}
        >
        {board}
        </div>
    )
}
