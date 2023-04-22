export const showCounter = (showCards) => {
  const showsNavigation = document.querySelector('.shows-navigation');
  showsNavigation.innerText = `Shows(${
    showCards.length ? showCards.length : 0
  })`;
  return showsNavigation;
};

export const commentCounter = (comments) => {
  const commentCount = document.createElement('h3');
  commentCount.innerText = `comments(${comments.length ? comments.length : 0})`;
  return commentCount.innerText;
};
