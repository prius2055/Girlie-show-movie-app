import './style.css';
import likeButton from './img/heart.png'
const homepage = document.getElementById('homepage');
homepage.innerHTML = '';

window.addEventListener('DOMContentLoaded', () => {
  let shows;
  const fetchMemes = async () => {
    const response = await fetch('https://api.tvmaze.com/search/shows?q=girls');
    const results = await response.json();
    shows = results
    console.log(shows);

    // for (let i = 1; i < 7; i++) {
    //   homepage.innerHTML += `<div class='show'>
    //     <img src='${shows[i].url}' alt='${shows[i].name}' width='250px' height='200px' />
    //     <div class='show-name'>
    //       <p>${shows[i].name}</p>
    //       <div class='show-likes'>
    //         <img src='${likeButton}'/>
    //         <p>3 likes</p>
    //       </div>
    //     </div>
    //     <button>Comments</button>
    //     <button>Reservations</button>
    //     </div>`;
    // }
  };

  fetchMemes();
});
