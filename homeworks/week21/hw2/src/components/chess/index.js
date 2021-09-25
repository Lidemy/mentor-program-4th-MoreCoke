import React from 'react';

import { Square, BlackChess, WhiteChess, TransparentChess } from './style';

function Chess(props) {
  const renderChess = () => {
    let SelectedChess;
    if (props.color === 'white') {
      SelectedChess = <WhiteChess onClick={() => props.onClick(props.rowIdx, props.colIdx)} />;
    } else if (props.color === 'black') {
      SelectedChess = <BlackChess onClick={() => props.onClick(props.rowIdx, props.colIdx)} />;
    } else {
      SelectedChess = (
        <TransparentChess onClick={() => props.onClick(props.rowIdx, props.colIdx)} />
      );
    }
    return SelectedChess;
  };

  return (
    <Square rowIdx={props.rowIdx} colIdx={props.colIdx}>
      {renderChess()}
    </Square>
  );
}

export default Chess;
