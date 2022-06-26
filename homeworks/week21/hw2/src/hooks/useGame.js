import { useState, useCallback } from 'react';

export default function useGame(arr) {
  const [game, setGame] = useState(arr || new Array(20).fill(new Array(20).fill(null)));
  const [chessColor, setChessColor] = useState('black');
  const updateGame = useCallback((r, c, color) => {
    const newGame = game.map((row, rowIdx) => {
      if (rowIdx === r) {
        const newRow = row.map((col, colIdx) => {
          if (colIdx === c && col === null) {
            return color;
          }
          return col;
        });
        return newRow;
      }
      return row;
    });
    setGame(newGame);
  });
  const updateChessColor = useCallback(() => {
    if (chessColor === 'black') {
      setChessColor('white');
      return;
    }
    setChessColor('black');
  });

  const onChessClick = useCallback(
    (row, column) => {
      updateGame(row, column, chessColor);
      updateChessColor();
    },
    [chessColor]
  );

  return { game, setGame, onChessClick };
}
