import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
`;

const Content = styled.p`
  text-align: center;
  font-size: 18px;
`;

export default function AboutPage() {
  return (
    <Root>
      <Title>關於我</Title>
      <Content>我的椎間盤比我的能力還突出。</Content>
    </Root>
  );
}
