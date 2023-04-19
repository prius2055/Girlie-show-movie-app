import './style.css';
import likeButton from './img/heart.png';

window.addEventListener('DOMContentLoaded', () => {
  let shows = [];
  let numOfLikes = [];
  const involvementUrl =
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

  //INVOLEMENT API
  const fetchInvolvementAPI = async () => {
    const response = await fetch(`${involvementUrl}apps`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const app_id = await response.text();
    return app_id;
  };

  // POSTING LIKES TO API
  const postLikesHandler = async (id) => {
    const response = await fetch(
      `${involvementUrl}apps/MSFkPneas7bTu41OHrLL/likes`,
      {
        method: 'POST',
        body: JSON.stringify({
          item_id: id,
          
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
    const result = await response.text();
    return result;
  };

  // GETTING LIKES FROM API
  const getLikesHandler = async (id) => {
    const response = await fetch(
      `${involvementUrl}apps/MSFkPneas7bTu41OHrLL/likes`
    );
    const numOfLikes = await response.json();
    console.log(numOfLikes);
    display(shows, numOfLikes);
  };

  //FETCHING SINGLE SHOW
  const fetchSingleShow = async (para) => {
    const response = await fetch(
      `https://api.tvmaze.com/lookup/shows?imdb=${para}`
    );
    const results = await response.json();
  };

  //MODAL DISPLAY
  const modalDisplay = () => {};

  //MAIN SCREEN DISPLAY
  const display = (shows, numOfLikes) => {
    const homepage = document.getElementById('homepage');
    homepage.innerHTML = '';
    for (let i = 0; i < 6; i++) {
      homepage.innerHTML += `<div class='show'>
        <img src='${shows[i].show.image.original}' alt='${shows[i].show.name}' width='250px' height='200px' />
        <div class='show-name'>
          <p>${shows[i].show.name}</p>
          <div class='show-likes'>
            <img src='${likeButton}' alt='like button' class='like-button'/>
            <p>${numOfLikes[i].likes} likes</p>
          </div>
        </div>
        <button class='comment-button'>Comments</button>
        <button>Reservations</button>
        </div>`;
    }

    //ADD EVENTS TO COMMENTS BUTTON
    const commentButtons = document.querySelectorAll('.comment-button');
    // const showModal = document.querySelectorAll('.modal')

    commentButtons.forEach((commentButton, i) =>
      commentButton.addEventListener('click', (e) => {
        e.preventDefault();
        const imdb = shows[i].show.externals.imdb;
        console.log(imdb);
        const show = fetchSingleShow(imdb);
       
      })
    );


    //ADD EVENTS TO LIKE BUTTON
    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach((likeButton, i) =>
      likeButton.addEventListener('click', () => {
        postLikesHandler(i);
        getLikesHandler();
      })
    );
  };

  // ADD MODAL PAGE

  let modal = document.querySelector('.content');

const getSeries =  async () => {
  const res  = await fetch('https://api.tvmaze.com/shows/1/episodes')
  const result = await  res.json()
  return result;
}

const fetchData =  (id1) => {
   const data = getSeries().then((output) => {
      output.forEach( (movie) => {
      if ( movie.id.toString() === id1.toString())
        modal.innerHTML = `
          <div class="content">
            <img class="original" src="${movie.image.original}" alt="">
            <div class="text">
              <h1 class="text-title">${movie.name}</h1>
              <p class="language">${movie.summary}</p>
            </div>
          </div>
          <div class="comments-section">
            <p>Comments<span class="commment-counter"></span></p>
            <span class="close">&times;</span>

          </div>
        `
    })
   })

};

  fetchShows();
  getLikesHandler();
});
