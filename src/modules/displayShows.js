/* eslint-disable import/no-cycle */
import { getLikes, postLikes, fetchSingleShow } from './fetch.js';

import likeButton from '../img/heart.png';

const showModal = document.querySelector('.modal');
const modal = document.querySelector('.content');

// MAIN SCREEN DISPLAY
export const mainDisplay = (showObject) => {
  const { shows } = showObject;
  const { numOfLikes } = showObject;

  const homepage = document.getElementById('homepage');
  homepage.innerHTML = '';
  for (let i = 0; i < 6; i += 1) {
    homepage.innerHTML += `<div class='show'>
        <img src='${shows[i].show.image.original}' alt='${shows[i].show.name}' width='250px' height='200px' />
        <div class='show-name'>
          <p>${shows[i].show.name}</p>
          <div class='show-likes'>
            <img src='${likeButton}' alt='like button' class='like-button'/>
            <p> ${numOfLikes[i].likes} likes</p>
          </div>
        </div>
        <button class='comment-button'>Comments</button>
        <button>Reservations</button>
        </div>`;
  }

  // ADD EVENTS TO COMMENTS BUTTON
  const commentButtons = document.querySelectorAll('.comment-button');
  commentButtons.forEach((commentButton, i) => commentButton.addEventListener('click', (e) => {
    e.preventDefault();
    const { imdb } = shows[i].show.externals;
    fetchSingleShow(imdb);
    showModal.classList.add('active');
  }));

  // ADD EVENTS TO LIKE BUTTON
  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach((likeButton, i) => likeButton.addEventListener('click', () => {
    postLikes(i);
    getLikes(shows);
  }));
};

// MODAL SCREEN DISPLAY FUNCTION
export const modalDisplay = (show) => {
  modal.innerHTML = `
          <div class="content-display">
            <img class="original" src=${show.image.original} alt=${show.image.original}>
            <div class="text">
              <h1 class="text-title">${show.name}</h1>
              <p class="language">${show.language}</p>
              <p class="language">${show.genres[0]}</p>
            </div>
          </div>
          <div class="comments-section">
            <h3>Comments<span class="commment-counter">(&times;)</span></h3>
            <p>03/11/2021 Alex: I'd love to buy it</p>
            <p>03/11/2021 Alex: I'd love to buy it</p>
            <div class='comment-input'>
              <h3>Add a comment</h3>
              <input type="text" placeholder="Your name"/>
              <textarea>Your name</textarea/>
              <button class="modal-comment-button">Comment</button>
            </div>
          </div>
        `;

  const modalCommentBtn = document.querySelector('.modal-comment-button');
  modalCommentBtn.addEventListener('click', () => {});
};
