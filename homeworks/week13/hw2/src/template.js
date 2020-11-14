export const cssTemplate = '.card { margin-top: 12px; }';
export const loadMoreButtonHTML =
  '<button class="load-more btn btn-primary">載入更多</button>';
export const formTemplate = `
      <div>
        <form class="add-comment-form">
          <div class="form-group">
            <label for="form-nickname">暱稱</label>
            <input
              name="nickname"
              type="text"
              class="form-control"
              id="form-nickname"
            />
          </div>
          <div class="form-group">
            <label for="content-textarea">留言內容</label>
            <textarea
              name="content"
              class="form-control"
              id="content-textarea"
              rows="3"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">送出</button>
        </form>
        <div class="comments"></div>
      </div>`;
