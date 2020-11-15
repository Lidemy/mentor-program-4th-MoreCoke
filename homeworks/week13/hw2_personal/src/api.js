import $ from 'jquery';
import { prependCommentToDom } from './template';

const apiUrl = 'http://mentor-program.co/mtr04group3/MoreCoke/week12/hw1/php';

export function getCommentData(commentsDOM, siteKey, commentlimitNum) {
  let url = `${apiUrl}/api_comments.php?site_key=${siteKey}&limit=${commentlimitNum}`;
  if (!commentlimitNum) {
    url = `${apiUrl}/api_comments.php?site_key=${siteKey}`;
  }
  $.ajax({
    url,
  }).done((data) => {
    if (!data.ok) {
      console.log(data.message);
      return;
    }
    if (data.isTotal) {
      $('.btn-load').remove();
    }
    commentsDOM.empty();
    data.discussions.forEach((comment) =>
      prependCommentToDom(commentsDOM, comment)
    );
  });
}

export function postCommentData(
  commentsDOM,
  { siteKey, nicknameDOM, contentDOM }
) {
  const url = `${apiUrl}/api_add_comments.php?site_key=${siteKey}`;
  const formData = {
    site_key: siteKey,
    nickname: nicknameDOM.val(),
    content: contentDOM.val(),
  };
  $.ajax({
    type: 'POST',
    url,
    data: formData,
  }).done((data) => {
    if (!data.ok) {
      console.log(data.message);
      return;
    }
    prependCommentToDom(commentsDOM, data.message, true);
    nicknameDOM.val('');
    contentDOM.val('');
  });
}
