/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
/* eslint-disable no-alert */
const userInfo = {
  needed: {
    name: null,
    mail: null,
    phone: null,
    activity: null,
    know: null,
  },
  other: {
    other: null,
  },
};

function checkInputValue(e) {
  const { value, name } = e.target;
  const postponeGroup = e.target.closest('.postpone-group');
  const reMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const rePhone = /^\d{10}$/;
  const mailValid = value && reMail.test(value);
  const phoneValid = value && rePhone.test(value);
  const inputValid = value && ((name === 'name') || (name === 'know') || (name === 'activity'));
  const noNeedValid = (name === 'other');
  if (inputValid || mailValid || phoneValid || noNeedValid) {
    postponeGroup.classList.remove('warning');
  } else {
    postponeGroup.classList.add('warning');
  }
  if (noNeedValid) {
    userInfo.other[name] = value;
  } else {
    userInfo.needed[name] = value;
  }
  console.log(JSON.parse(JSON.stringify(userInfo)));
}

function showUserInfo(e) {
  const isInputEmpty = Object.keys(userInfo.needed).some(key => (userInfo.needed[key] === null));
  if (isInputEmpty) {
    e.preventDefault();
    alert('資料尚未填寫或資料格式錯誤');
    for (const [key, value] of Object.entries(userInfo.needed)) {
      if (!value) {
        const postponeGroup = document.querySelector(`input[name=${key}]`).closest('.postpone-group');
        postponeGroup.classList.add('warning');
      }
    }
    // 也能這樣寫
    // Object.keys(userInfo.needed).forEach((key) => {
    //   if (!userInfo.needed[key]) {
    //     const postponeGroup = document.querySelector(`input[name=${key}]`).closest('.postpone-group');
    //     postponeGroup.classList.add('warning');
    //   }
    // });
  } else {
    const other = `${userInfo.other.other ? `其他: ${userInfo.other.other}` : ''}`;
    const info = `
    暱稱: ${userInfo.needed.name}
    郵件: ${userInfo.needed.mail}
    電話: ${userInfo.needed.phone}
    選擇活動: ${userInfo.needed.activity}
    如何得知活動: ${userInfo.needed.know}
    ${other}
    `;
    alert(info);
  }
}

const postponeBtn = document.querySelector('.postpone-btn');
const postponeForm = document.querySelector('.postpone');

postponeBtn.addEventListener('click', showUserInfo);
postponeForm.addEventListener('propertychange', checkInputValue);
postponeForm.addEventListener('input', checkInputValue);
