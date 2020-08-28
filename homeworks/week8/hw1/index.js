/* eslint-disable no-alert */
/* eslint-disable func-names */

function toggleNavList() {
  const navList = document.querySelector('.nav-list');
  const navIcon = document.querySelector('.normal-icon');
  navList.classList.toggle('show');
  navIcon.classList.toggle('close');
}

function prizeBgc(prize) {
  switch (prize) {
    case 'FIRST':
      return {
        backgroundImage: "linear-gradient( rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),url('./img/flight.jpg')",
        color: 'black',
        msg: '恭喜你中頭獎了！日本東京來回雙人遊！',
      };
    case 'SECOND':
      return {
        backgroundImage: "linear-gradient( rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),url('./img/living-room.jpg')",
        color: 'black',
        msg: '二獎！90 吋電視一台！',
      };
    case 'THIRD':
      return {
        backgroundImage: "linear-gradient( rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),url('./img/youtube.jpg')",
        color: 'black',
        msg: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！',
      };
    default:
      return {
        backgroundImage: "linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url('./img/games-bn.jpg')",
        color: 'white',
        msg: '銘謝惠顧',
      };
  }
}

function getAsyncDrawLot(e) {
  if (e.target.classList.contains('lottery-btn')) {
    const req = new XMLHttpRequest();
    const url = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
    req.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        const { prize } = JSON.parse(this.responseText);
        const { backgroundImage, msg, color } = prizeBgc(prize);
        const lottery = document.querySelector('.lottery');
        const div = document.createElement('div');
        lottery.style.backgroundImage = backgroundImage;
        lottery.style.color = color;
        lottery.innerHTML = '';
        div.className = 'lottery-msg';
        div.innerHTML = `<h1>${msg}</h1>
        <button class="lottery-btn">我要抽獎</button>
        `;
        console.log(msg);
        lottery.appendChild(div);
        console.log(this);
      } else {
        alert('系統不穩定，請再試一次');
      }
    };

    // 這裡的 this 會指向 btn，想問為什麼後面用 bind(req) 還是不行呢?
    // req.onload = (() => {
    //   console.log(this);
    // }).bind(this);

    req.open('GET', url);
    req.send();
  }
}


const lottery = document.querySelector('.lottery');
const toggleBtn = document.querySelector('.nav-toggle');
toggleBtn.addEventListener('click', toggleNavList);
lottery.addEventListener('click', getAsyncDrawLot);
