import './style.css';
import likeButton from './img/heart.png';

let show_id;
const involvementUrl =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

const likeButtonHandler = async (show_id, id) => {
  const response = await fetch(`${involvementUrl}apps/${show_id}/likes`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
    }),

    // body: JSON.stringify({ item_id: id }),
  });
  const result1 = await response.json();
  const result = response;
  console.log(result);
  console.log(result1);
};

const fetchSingleShow = async (para) => {
  const response = await fetch(
    `https://api.tvmaze.com/lookup/shows?imdb=${para}`
  );
  const results = await response.json();
  console.log(results);
};

window.addEventListener('DOMContentLoaded', () => {
  //INVOLEMENT API
  const fetchInvolvementAPI = async () => {
    const response = await fetch(`${involvementUrl}apps`, {
      method: 'POST',
    });
    show_id = await response.text();
    console.log(show_id);
    return show_id;
  };

  //BASE API
  const fetchShows = async () => {
    const homepage = document.getElementById('homepage');
    homepage.innerHTML = '';
    let shows;

    const response = await fetch('https://api.tvmaze.com/search/shows?q=girls');
    const results = await response.json();
    shows = results;
    console.log(shows);

    for (let i = 0; i < 6; i++) {
      homepage.innerHTML += `<div class='show'>
        <img src='${shows[i].show.image.original}' alt='${shows[i].show.name}' width='250px' height='200px' />
        <div class='show-name'>
          <p>${shows[i].show.name}</p>
          <div class='show-likes'>
            <img src='${likeButton}' alt='like button' class='like-button'/>
            <p>3 likes</p>
          </div>
        </div>
        <button class='comment-button'>Comments</button>
        <button>Reservations</button>
        </div>`;
    }

    //ADD EVENTS TO COMMENTS BUTTON
    const commentButtons = document.querySelectorAll('.comment-button');

    commentButtons.forEach((commentButton, i) =>
      commentButton.addEventListener('click', (e) => {
        e.preventDefault();
        const imdb = shows[i].show.externals.imdb;
        console.log(imdb);
        fetchSingleShow(imdb);
      })
    );

    //ADD EVENTS TO LIKE BUTTON
    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach((likeButton, i) =>
      likeButton.addEventListener('click', () => {
        likeButtonHandler(show_id, i);
        console.log(i);
      })
    );
  };

  fetchShows();
  fetchInvolvementAPI();
});
