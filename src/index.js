import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
const divForRender = document.querySelector('.gallery');
const input = document.querySelector('input[name="searchQuery"]');
const btn = document.querySelector('.load-more');

let searchQuery = '';
let page = 1;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = input.value.trim();
    if (searchQuery !== '') {
  divForRender.innerHTML = '';
  page = 1;
  fetchCountries(searchQuery, page)
.then(data => {
  renderImages(data.hits);
    if (data.totalHits <= divForRender.children.length) {
  btn.style.display = 'none';
  Notiflix.Notify.info("Вибачте, але ви дійшли до кінця результатів пошуку.");
}  else {
  btn.style.display = 'block';
}
})
.catch(error => console.error('Помилка:', error));
} else {
divForRender.innerHTML = '';
}
});

btn.addEventListener('click', () => {
page++;
  fetchCountries(searchQuery, page)
  .then(data => {
  renderImages(data.hits);
if (data.totalHits <= divForRender.children.length) {
  btn.style.display = 'none';
  Notiflix.Notify.info("Вибачте, але ви дійшли до кінця результатів пошуку.");
} else {
  btn.style.display = 'block';
}
})
.catch(error => console.error('Помилка:', error));
});

function renderImages(images) {
const imageList = images.map(image => {
const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
return `
<div class="image-card"> <img src="${webformatURL}" alt="${tags}" class="image-card__image" data-source="${largeImageURL}"> <div class="image-card__stats"> <p class="image-card__stats-item"> <i class="material-icons">thumb_up</i> ${likes} </p> <p class="image-card__stats-item"> <i class="material-icons">visibility</i> ${views} </p> <p class="image-card__stats-item"> <i class="material-icons">comment</i> ${comments} </p> <p class="image-card__stats-item"> <i class="material-icons">cloud_download</i> ${downloads} </p> </div> </div>
` ;
});
  divForRender.innerHTML += imageList.join('');
}