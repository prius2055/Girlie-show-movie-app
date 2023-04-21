export const memeCounter = (shows) => {
  const showsNavigation = document.querySelector('.shows-navigation');
  showsNavigation.innerText = `Shows(${shows.length ? shows.length : 0})`;
};

export const commentCounter = (comments) => {
  const commentCount = document.createElement('h3');
  commentCount.innerText = `comments(${comments.length ? comments.length : 0})`;
  return commentCount.innerText;
};
