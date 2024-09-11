import { useState } from "react";


function Square({value, onSquareClick}) {
    return <button className="square" onClick={onSquareClick}> {value}</button>
}

function RotBtn({value, onRotClick}) {
    return <button className="round" onClick={onRotClick}> {value} </button>
}


export default function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(16).fill(null));
    const winner = calculateWinner(squares);
    const [isMove, setIsMove] = useState(true);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X": "O");
    }

    function handleSquareClick(i) {
        const nextSquare = squares.slice();
        if (!isMove) {
            return
        }
        if (nextSquare[i] || winner) {
            return
        }
        if (xIsNext) {
            nextSquare[i] = "X";
        } else {
            nextSquare[i] = "0";
        }
        setSquares(nextSquare);
        setXIsNext(!xIsNext);
        setIsMove(false);
    }

    // Rotate right
    // 0  1  2  3       4  0  1  2
    // 4  5  6  7    => 8  9  5  3
    // 8  9  10 11      12 10 6  7
    // 12 13 14 15      13 14 15 11

    function handleRotRightClick() {
        if (isMove || winner) {
            return
        }
        const rotationMap = [4, 0, 1, 2, 8, 9, 5, 3, 12, 10, 6, 7, 13, 14, 15, 11];
        const nextSquare = rotationMap.map(index => squares[index]);

        calculateWinner(nextSquare);
        setSquares(nextSquare);
        setIsMove(true);
    }

    // Rotate left
    // 0  1  2  3       1  2  3  7
    // 4  5  6  7    => 0  6  10 11
    // 8  9  10 11      4  5  9  15
    // 12 13 14 15      8  12 13 14

    function handleRotLeftClick() {
        if (isMove || winner) {
            return
        }
        const rotationMap = [1, 2, 3, 7, 0, 6, 10, 11, 4, 5, 9, 15, 8, 12, 13, 14];
        const nextSquare = rotationMap.map(index => squares[index]);

        calculateWinner(nextSquare);
        setSquares(nextSquare);
        setIsMove(true);
    }


    return (
        <>
            <div className="status"> {status} </div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)}/>
                <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)}/>

            </div>
            <div className="board-row">
                <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)}/>
                <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)}/>

            </div>
            <div className="board-row">
                <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)}/>
                <Square value={squares[9]} onSquareClick={() => handleSquareClick(9)}/>
                <Square value={squares[10]} onSquareClick={() => handleSquareClick(10)}/>
                <Square value={squares[11]} onSquareClick={() => handleSquareClick(11)}/>
            </div>
            <div className="board-row">
                <Square value={squares[12]} onSquareClick={() => handleSquareClick(12)}/>
                <Square value={squares[13]} onSquareClick={() => handleSquareClick(13)}/>
                <Square value={squares[14]} onSquareClick={() => handleSquareClick(14)}/>
                <Square value={squares[15]} onSquareClick={() => handleSquareClick(15)}/>
            </div>

            <div className="div-btn">
                <RotBtn value="<" onRotClick={() => handleRotLeftClick()}/>
                <RotBtn value=">" onRotClick={() => handleRotRightClick()}/>
            </div>
        </>

    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
            return squares[a];
        }
    }
    return null;
}