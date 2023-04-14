export function fetchImages(searchQuery, page) {
  const API_KEY = '35296030-9d94bf8639927ba5c1b76a02f';
  const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(`${BASE_URL}&q=${searchQuery}&page=${page}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`There are no images by search request "${searchQuery}"`)
    );
  });
}
