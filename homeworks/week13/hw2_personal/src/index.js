import $ from 'jquery';

import { getCommentData, postCommentData } from './api';
import { formTemplate } from './template';

export function init(container, siteKey) {
  $(container).append(formTemplate(siteKey));
  const commentsDOM = $(`#${siteKey} .comments`);
  const nicknameDOM = $(`#${siteKey} input[name="nickname"]`);
  const contentDOM = $(`#${siteKey} textarea[name="content"]`);
  const addCommentDOM = $(`#${siteKey} .add-comment-form`);
  const btnLoadDOM = $(`#${siteKey} .btn-load`);
  let limit = 5;

  addCommentDOM.submit((e) => {
    e.preventDefault();
    postCommentData(commentsDOM, {
      siteKey: siteKey,
      nicknameDOM,
      contentDOM,
    });
  });

  btnLoadDOM.click(() => {
    limit += 5;
    getCommentData(commentsDOM, siteKey, limit);
  });
  getCommentData(commentsDOM, siteKey, limit);
}
