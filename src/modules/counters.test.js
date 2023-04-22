/**
 * @jest-environment jsdom
 */
// Import the function to be tested
import { showCounter, commentCounter } from './counters.js';

describe('showCounter', () => {
  let showsNavigation;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="shows-navigation"></div>
    `;
    showsNavigation = document.querySelector('.shows-navigation');
  });

  test('updates the shows count with the correct count', (showCards = new Array(
    10,
  )) => {
    const result = showCounter(showCards);
    expect(showsNavigation.innerText).toBe('Shows(10)');
    expect(result).toBe(showsNavigation);
  });

  test('updates the shows count when the showCards array is empty', (showCards = []) => {
    const result = showCounter(showCards);
    expect(showsNavigation.innerText).toBe('Shows(0)');
    expect(result).toBe(showsNavigation);
  });
});

test('updates the comments count when the comments array is empty', (comments = []) => {
  const result = commentCounter(comments);
  expect(result).toEqual('comments(0)');
});
