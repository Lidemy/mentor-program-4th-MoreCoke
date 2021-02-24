import styled from 'styled-components';

import {
  MEDIA_QUERY_XL,
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from 'constants/rwd';

export const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  ${MEDIA_QUERY_SM} {
    max-width: 540px;
  }
  ${MEDIA_QUERY_MD} {
    max-width: 720px;
  }
  ${MEDIA_QUERY_LG} {
    max-width: 960px;
  }

  ${MEDIA_QUERY_XL} {
    max-width: 1140px;
  }
`;

export const FilterButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
`;
