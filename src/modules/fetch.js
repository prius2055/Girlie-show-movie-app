/* eslint-disable import/no-cycle */
import { mainDisplay, modalDisplay } from './displayShows.js';

export const involvementUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

// INVOLEMENT API
export const fetchInvolvementAPI = async () => {
  const response = await fetch(`${involvementUrl}apps`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const appId = await response.text();
  return appId;
};

// A HELPER FUNCTION
export const helperFunction = (showObject) => {
  mainDisplay(showObject);
};

// GET LIKES FROM API AND PASS TO DISPLAY
export const getLikes = async (shows) => {
  const response = await fetch(
    `${involvementUrl}apps/MSFkPneas7bTu41OHrLL/likes`,
  );
  const numOfLikes = await response.json();
  helperFunction({ shows, numOfLikes });
};

// GET SHOWS FROM API AND PASS TO DISPLAY
export const fetchShows = async () => {
  const response = await fetch('https://api.tvmaze.com/search/shows?q=girls');
  const shows = await response.json();
  getLikes(shows);
};

// POSTING LIKES TO API
export const postLikes = async (id) => {
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
    },
  );
  const result = await response.text();
  return result;
};

// FETCHING SINGLE SHOW & CALLING MODAL DISPLAY
export const fetchSingleShow = async (para) => {
  const response = await fetch(
    `https://api.tvmaze.com/lookup/shows?imdb=${para}`,
  );
  const show = await response.json();

  modalDisplay(show);
};
