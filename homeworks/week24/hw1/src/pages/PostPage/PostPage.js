import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';

import {
  postPostAsync,
  editPostByIdAsync,
  getPostDetailAsync,
  setDetail,
  selectDetail,
} from '../../redux/slices/postSlice';

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
  const { pid } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector(selectDetail);

  // 如果是編輯文章，打 api 拿資料
  useEffect(() => {
    if (pid) {
      dispatch(getPostDetailAsync(pid));
    }

    return () => dispatch(setDetail({}));
  }, [pid, dispatch]);

  // 處理切換頁面 input 更新問題
  useEffect(() => {
    if (detail && Object.keys(detail).length === 0) {
      setTitle('');
      setContent('');
    } else {
      setTitle(detail.title);
      setContent(detail.body);
    }
  }, [detail]);

  const handleSubmit = () => {
    setErrorMessage(null);
    if (!title && !content) {
      setErrorMessage('不得留空');
      return;
    }

    if (pid) {
      editPost();
    } else {
      createPost();
    }
  };

  const createPost = () => {
    dispatch(postPostAsync(title, content)).then((res) => {
      alert('新增成功!');
      history.goBack();
    });
  };

  const editPost = () => {
    dispatch(editPostByIdAsync(pid, title, content)).then((res) => {
      alert('編輯成功!');
      history.push('/');
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
