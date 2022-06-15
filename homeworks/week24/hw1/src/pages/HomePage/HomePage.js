import React, { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { getPostsByPageAsync, selectPosts, selectTotal } from '../../redux/slices/postSlice';

const PAGE_LIMIT = 5;

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const PostTitle = styled(Link)`
  font-size: 24px;
  color: #333;
  text-decoration: none;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

const Pagination = memo(({ onPageChange, total }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = useMemo(() => Math.ceil(total / PAGE_LIMIT), [total]);
  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);
  return (
    <div>
      <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
        上一頁
      </button>
      <span>{`${currentPage} / ${totalPage}`}</span>
      <button disabled={currentPage === totalPage} onClick={() => setCurrentPage(currentPage + 1)}>
        下一頁
      </button>
    </div>
  );
});

Pagination.propTypes = {
  onPageChange: PropTypes.func,
  total: PropTypes.number,
};

export default function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const total = useSelector(selectTotal);

  useEffect(() => {
    dispatch(getPostsByPageAsync());
  }, [dispatch]);

  const onPageChange = useCallback((currentPage) => {
    dispatch(getPostsByPageAsync(currentPage));
  }, [dispatch]);

  return (
    <Root>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <Pagination onPageChange={onPageChange} total={total} />
    </Root>
  );
}
