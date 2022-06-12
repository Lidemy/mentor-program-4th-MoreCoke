import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';

import { getPostDetail } from '../../WebAPI';
import { convertTimeStamp } from '../../utils';

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
  const [detail, setDetail] = useState({});
  const { pid } = useParams();
  const history = useHistory();

  useEffect(() => {
    getPostDetail(pid).then((res) => {
      setDetail(res);
    });
  }, [pid]);

  const createTime = useMemo(() => {
    return convertTimeStamp(detail.createdAt);
  }, [detail.createdAt]);

  return (
    <Root>
      <Title>{detail.title}</Title>
      <SubtitleSection>
        <p>{`貼文者: ${detail.user?.username}`}</p>
        <p>{`建立時間: ${createTime}`}</p>
      </SubtitleSection>
      <Content>
        <p>
          {detail.body}
        </p>
        <Button onClick={() => history.goBack()}>回上一頁</Button>
      </Content>
    </Root>
  );
}
