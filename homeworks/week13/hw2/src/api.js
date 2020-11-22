import $ from 'jquery';

export function getComments(apiUrl, siteKey, before, cb) {
  let url = `${apiUrl}/api_comments.php?site_key=${siteKey}`;
  if (before) {
    url += '&before=' + before;
  }
  $.ajax({
    url,
  }).done(function (data) {
    cb(data);
  });
}

export function addComments(apiUrl, siteKey, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comments.php?site_key=${siteKey}`,
    data,
  }).done(function (data) {
    cb(data);
  });
}
