import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';

import { convertTimeStamp } from '../../utils';
import { setDetail,getPostDetailAsync, delPostByIdAsync, selectDetail } from '../../redux/slices/postSlice';

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
`;

const SubtitleSection = styled.div`
  font-size: 18px;
  color: gray;
  margin-bottom: 16px;
  p {
    margin: 0px 0px 10px 0px;
  }
`;

const Content = styled.div`
  text-align: center;
  font-size: 18px;
`;

const Button = styled.button`
  text-align: center;
  width: 100px;
  background-color: transparent;
  outline: none;
  border: 2px solid black;
  font-size: 18px;
  cursor: pointer;
`;

export default function DetailPage() {
  const dispatch = useDispatch();
  const detail = useSelector(selectDetail);
  const { pid } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(getPostDetailAsync(pid));

    return () => dispatch(setDetail({}));
  }, [pid, dispatch]);

  const createTime = useMemo(() => {
    return convertTimeStamp(detail.createdAt);
  }, [detail.createdAt]);

  const onEditClick = () => {
    history.push(`/edit-post/${pid}`);
  };

  const onDeleteClick = () => {
    const confirmed = window.confirm('確認刪除?');

    if (confirmed) {
      dispatch(delPostByIdAsync(pid)).then(() => {
        history.push('/');
      });
    }
  };

  return (
    <Root>
      <Title>{detail.title}</Title>
      <Button onClick={onEditClick}>編輯</Button>
      <Button onClick={onDeleteClick}>刪除</Button>
      <SubtitleSection>
        <p>{`貼文者: ${detail.user?.username}`}</p>
        <p>{`建立時間: ${createTime}`}</p>
      </SubtitleSection>
      <Content>
        <p>{detail.body}</p>
        <Button onClick={() => history.goBack()}>回上一頁</Button>
      </Content>
    </Root>
  );
}
