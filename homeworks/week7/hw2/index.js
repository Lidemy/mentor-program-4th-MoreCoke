function toggleNavList() {
  const navList = document.querySelector('.nav__list');
  const navIcon = document.querySelector('.normal__icon');
  navList.classList.toggle('show');
  navIcon.classList.toggle('close');
}

function toggleQuestionResponse(e) {
  const questionNum = e.target.getAttribute('data-question');
  if (questionNum) {
    const icon = e.target.querySelector('.question__desc-icon');
    const response = document.querySelector(`[data-response='${questionNum}']`);
    icon.classList.toggle('close');
    response.classList.toggle('show');
  }
}

const toggleBtn = document.querySelector('.nav__toggle');
const questionContent = document.querySelector('.question__content');

toggleBtn.addEventListener('click', toggleNavList);
questionContent.addEventListener('click', toggleQuestionResponse);
