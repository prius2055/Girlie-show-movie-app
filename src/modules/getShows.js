import { getLikes } from './fetch.js';

// GET SHOWS FROM API AND PASS TO DISPLAY
const fetchShows = async () => {
  const response = await fetch('https://api.tvmaze.com/search/shows?q=girls');
  const shows = await response.json();
  getLikes(shows);
};

export default fetchShows;
