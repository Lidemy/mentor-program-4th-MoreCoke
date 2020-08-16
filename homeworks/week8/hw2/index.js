/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
const clientId = 'bln1yehoadgj1i6k3l7vkccwp2s7ar';
const accept = 'application/vnd.twitchtv.v5+json';

const data = {
  games: {
    url: 'https://api.twitch.tv/kraken/games/top',
  },
  lives: {
    url: ' https://api.twitch.tv/kraken/streams/',
  },
};

const toggleNavList = () => {
  const navList = document.querySelector('.nav-list');
  const navIcon = document.querySelector('.normal-icon');
  navList.classList.toggle('show');
  navIcon.classList.toggle('close');
};

const useFetch = (url, renderCallback) => {
  fetch(url, {
    headers: {
      'Client-ID': clientId,
      Accept: accept,
    },
  })
    .then(response => response.json())
    .then(response => renderCallback(response));
};

const getTwitchTopGame = (num = 5) => {
  let {
    games: { url },
  } = data;
  url = `${url}?limit=${num}`;
  const renderNav = (response) => {
    const { top: games } = response;
    const navList = document.querySelector('.nav-list');
    navList.innerHTML = '';
    for (const game of games) {
      const {
        game: { name },
      } = game;
      const temp = `<li class="nav-item"><a herf="#">${name}</a></li>`;
      navList.innerHTML += temp;
    }
  };
  useFetch(url, renderNav);
};

const getTwitchGameList = (e) => {
  let {
    lives: { url },
  } = data;
  const game = e.target.innerText;
  url = `${url}?game=${game}&limit=20`;
  const renderLive = (response) => {
    const { streams } = response;
    const { game: choosedGame } = streams[0];
    const liveTitle = document.querySelector('.live-title');
    const liveCardGroup = document.querySelector('.live-card__group');
    liveTitle.innerText = choosedGame;
    liveCardGroup.innerHTML = '';
    for (const stream of streams) {
      const {
        channel: {
          display_name,
          logo,
          status,
          url: twitchUrl,
        },
        preview: { medium: gameBgc },
      } = stream;
      const temp = `
      <a class="live-card__item" href="${twitchUrl}" target="_blank">
        <div class="live-card__img" style="background-image: url(${gameBgc});"></div>
        <div class="live-card__content">
          <div class="live-card__avator" style="background-image: url(${logo});"></div>
          <div class="live-card__info">
            <div class="live-card__game">${status}</div>
            <div class="live-card__player">${display_name}</div>
          </div>
        </div>
      </a>
      `;
      liveCardGroup.innerHTML += temp;
    }
  };
  useFetch(url, renderLive);
};

getTwitchTopGame();

const toggleBtn = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
toggleBtn.addEventListener('click', toggleNavList);
navList.addEventListener('click', getTwitchGameList);
