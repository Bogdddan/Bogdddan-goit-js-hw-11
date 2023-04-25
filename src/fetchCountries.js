import Notiflix from 'notiflix';

export function fetchCountries(searchQuery, page) {
  return fetch(`https://pixabay.com/api/?key=35609158-f7b774b68c2563e05c4bac486&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
      }
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      Notiflix.Notify.failure('Oops, there was an error. Please try again later.');
    });
}

