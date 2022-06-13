import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { postPost } from '../../WebAPI';

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Button = styled.button`
  text-align: center;
  width: 100px;
  background-color: transparent;
  outline: none;
  border: 2px solid black;
  font-size: 18px;
  cursor: pointer;
  margin: 0px 5px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

export default function PostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = () => {
    setErrorMessage(null);
    if (!title && !content) {
      setErrorMessage('不得留空');
      return;
    }
    postPost(title, content).then((res) => {
      console.log('data', res);
      alert('新增成功!');
      history.goBack();
    });
  };

  return (
    <Root>
      <form>
        <div>
          <input
            placeholder="請輸入標題"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="請輸入內文"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
          ></textarea>
        </div>
        <Button onClick={handleSubmit}>送出</Button>
        <Button onClick={() => history.goBack()}>返回</Button>
      </form>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Root>
  );
}
