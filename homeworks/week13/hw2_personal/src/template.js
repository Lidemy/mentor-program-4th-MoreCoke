import { escapeHtml } from './utils';

export function prependCommentToDom(dom, comment, isPrepend) {
  const temp = `
    <div class="card mt-3">
      <div class="card-body">
        <h5 class="card-title">${escapeHtml(comment.nickname)}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${escapeHtml(
          comment.created_at
        )}</h6>
        <p class="card-text">${escapeHtml(comment.content)}</p>
      </div>
    </div>`;

  if (isPrepend) {
    dom.prepend(temp);
  } else {
    dom.append(temp);
  }
}

export function formTemplate(siteKey) {
  return `
  <div id="${siteKey}">
    <form class="add-comment-form">
      <div class="form-group">
        <label>暱稱</label>
        <input
          type="text"
          class="form-control"
          name="nickname"
        />
      </div>
      <div class="form-group">
        <label>內容</label>
        <textarea
          class="form-control"
          name="content"
          rows="3"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">提交</button>
    </form>
    <div class="comments mb-3"></div>
    <button class="btn btn-primary btn-load mb-3">載入更多</button>
  </div>
  `;
}
