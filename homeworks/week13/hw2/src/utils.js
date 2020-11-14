export function escape(toOutput) {
  return toOutput
    .replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F');
}

export function appendCommentToDOM(container, comment, isPrepend) {
  const html = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${comment.created_at} ${escape(
    comment.nickname
  )}</h5>
            <p class="card-text">${escape(comment.content)}</p>
          </div>
        </div>
      `;
  if (isPrepend) {
    container.prepend(html);
  } else {
    container.append(html);
  }
}
