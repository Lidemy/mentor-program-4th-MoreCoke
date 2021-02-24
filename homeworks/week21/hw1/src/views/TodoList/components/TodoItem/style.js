import styled from 'styled-components';

import { Button } from 'components/Button';

export const TodoItemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.75rem 1.25rem;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
`;

export const TodoItemCheckbox = styled.input.attrs(
  ({ defaultChecked, id }) => ({
    type: 'checkbox',
    defaultChecked,
    id: id || '',
  })
)`
  margin-right: 0.5rem;
`;

export const TodoItemEditInput = styled.input`
  margin-left: 0.5rem;
`;

export const TodoItemLabel = styled.label.attrs(({ htmlFor }) => ({
  htmlFor,
}))`
  ${({ isDone }) => isDone && `text-decoration: line-through;`}
`;

export const TodoItemContent = styled.div`
  display: flex;
  align-items: center;
`;

export const TodoItemButtons = styled.div`
  ${Button} ~ ${Button} {
    margin-left: 1rem;
  }
`;
