import styled from 'styled-components';
import { theme } from '../../constants/theme';

const Size = 19;
const needTransparent = (props) => props.rowIdx === Size || props.colIdx === Size;
const needBorder = (props) => props.rowIdx < Size && props.colIdx < Size;
const needBorderTop = (props) => props.rowIdx === 0 && props.colIdx < Size;
const needBorderLeft = (props) => props.rowIdx < Size && props.colIdx === 0;
const needBorderRight = (props) => props.rowIdx < Size && props.colIdx === Size - 1;
const needBorderBottom = (props) => props.rowIdx === Size - 1 && props.colIdx < Size;
export const Square = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (needTransparent(props) ? 'transparent' : theme.alpha)};
  border: 0.5px solid ${(props) => (needBorder(props) ? 'black' : 'transparent')};
  border-top: ${(props) => needBorderTop(props) && '1px solid black'};
  border-left: ${(props) => needBorderLeft(props) && '1px solid black'};
  border-right: ${(props) => needBorderRight(props) && '1px solid black'};
  border-bottom: ${(props) => needBorderBottom(props) && '1px solid black'};
  position: relative;

  &:before {
    content: '';
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    background: ${theme.alpha};
    z-index: -1;
  }
`;
export const CircleButton = styled.button`
  cursor: pointer;
  border-radius: 50%;
  outline: none;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  box-shadow: 2px 2px 2px 2px gray;
`;

export const BlackChess = styled(CircleButton)`
  background-color: black;
`;

export const WhiteChess = styled(CircleButton)`
  background-color: white;
`;

export const TransparentChess = styled(CircleButton)`
  background-color: transparent;
  box-shadow: none;
`;
