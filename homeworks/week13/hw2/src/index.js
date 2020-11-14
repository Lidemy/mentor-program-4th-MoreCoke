import $ from 'jquery';

import { addComments, getComments } from './api';
import { cssTemplate, loadMoreButtonHTML, formTemplate } from './template';
import { appendCommentToDOM } from './utils';

let siteKey = '';
let apiUrl = '';
let containerElement = null;
let commentDOM = null;
let lastId = null;
let isEnd = false;

export function init(options) {
  siteKey = options.siteKey;
  apiUrl = options.apiUrl;
  containerElement = $(options.containerSelector);
  containerElement.append(formTemplate);
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(cssTemplate));
  document.head.appendChild(styleElement);
  commentDOM = $('.comments');
  getNewComments();

  $('.comments').on('click', '.load-more', () => {
    getNewComments();
  });

  $('.add-comment-form').submit((e) => {
    e.preventDefault();
    const newCommentData = {
      site_key: siteKey,
      nickname: $('input[name=nickname]').val(),
      content: $('textarea[name=content]').val(),
    };
    addComments(apiUrl, siteKey, newCommentData, (data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      $('input[name=nickname]').val('');
      $('textarea[name=content]').val('');
      appendCommentToDOM(commentDOM, newCommentData, true);
    });
  });
}

function getNewComments() {
  $('.load-more').hide();
  if (isEnd) {
    return;
  }
  getComments(apiUrl, siteKey, lastId, (data) => {
    if (!data.ok) {
      alert(data.message);
      return;
    }

    const comments = data.discussions;
    for (let comment of comments) {
      appendCommentToDOM(commentDOM, comment);
    }
    let length = comments.length;
    if (length === 0) {
      isEnd = true;
      $('.load-more').hide();
    } else {
      lastId = comments[length - 1].id;
      $('.comments').append(loadMoreButtonHTML);
    }
  });
}
