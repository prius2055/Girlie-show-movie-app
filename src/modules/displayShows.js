import {
  getLikes,
  postLikes,
  fetchSingleShow,
  postComments,
  getComments,
} from './fetch.js';

import { commentCounter, showCounter } from './counters.js';

import likeButton from '../img/heart.png';
import closeButton from '../img/close.png';

const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');

// MAIN SCREEN DISPLAY
export const mainDisplay = (showObject) => {
  const { shows } = showObject;
  const { numOfLikes } = showObject;

  const homepage = document.getElementById('homepage');
  homepage.innerHTML = '';
  for (let i = 0; i < shows.length; i += 1) {
    homepage.innerHTML += `<div class='show'>
        <img src='${shows[i].show.image.original}' alt='${
  shows[i].show.name
}' width='250px' height='200px' />
        <div class='show-name'>
          <p>${shows[i].show.name}</p>
          <div class='show-likes'>
            <img src='${likeButton}' alt='like button' class='like-button'/>
            <p> ${numOfLikes[i] ? numOfLikes[i].likes : 0} likes</p>
          </div>
        </div>
        <button class='comment-button'>Comments</button>
        </div>`;
  }

  const showCards = document.querySelectorAll('.show');
  showCounter(showCards);

  // ADD EVENTS TO COMMENTS BUTTON
  const commentButtons = document.querySelectorAll('.comment-button');
  commentButtons.forEach((commentButton, i) => commentButton.addEventListener('click', (e) => {
    e.preventDefault();
    const { thetvdb } = shows[i].show.externals;
    const { imdb } = shows[i].show.externals;
    const id = i + 1;
    fetchSingleShow(thetvdb || imdb, id);
    modal.classList.add('active');
  }));

  // ADD EVENTS TO LIKE BUTTON
  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach((likeButton, i) => likeButton.addEventListener('click', () => {
    postLikes(i);
    setTimeout(() => {
      getLikes(shows);
    }, 1000);
  }));
};

// MODAL SCREEN DISPLAY FUNCTION
export const modalDisplay = (modalShowObject, i) => {
  const { show } = modalShowObject;
  const { comments } = modalShowObject;

  modalContent.innerHTML = `
          <div class="content">
           <img class="close-button" src=${closeButton} alt="Close button"/>
            <img class="original-img" src=${show.image.original} alt=${
  show.image.original
}>
            <div class="text">
              <h1 class="text-title">${show.name}</h1>
              <div class='language'>
              <p>Language:${show.language}</p>
              <p>Genre:${show.genres[0]}</p>
              </div>
              
            </div>
          </div>
          <div class="comments-section">
          <h3>${commentCounter(comments)}</h3>
          ${
  comments.length > 0
    ? comments.map(
      (comment) => `<p>${comment.creation_date} ${comment.username}: ${comment.comment}</p>`,
    )
    : '<p>No Available comments</p>'
}
            <div class='comment-input'>
              <h3>Add a comment</h3>
              <input type="text" placeholder="Your name" class="comment-name"/>
              <textarea class="comment-text" placeholder="Drop a comment here"></textarea/>
              <button class="modal-comment-button">Comment</button>
            </div>
          </div>
        `;
  const modalCommentName = document.querySelector('.comment-name');
  const modalCommentText = document.querySelector('.comment-text');
  const modalCommentBtn = document.querySelector('.modal-comment-button');
  modalCommentBtn.addEventListener('click', () => {
    const username = modalCommentName.value;
    const comment = modalCommentText.value;
    const id = i;
    postComments(id, username, comment);
    setTimeout(() => {
      getComments(id, show);
    }, 1000);
  });

  // CLOSE MODAL USING THE CLOSE (X) SIGN
  const modalCloseBtn = document.querySelectorAll('.close-button');
  modalCloseBtn.forEach((closeBtn) => closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  }));
};
