import findAndReplaceDamagedImage from './findAndReplaceDamagedImage';
import createHomepageFilmGalleryMarkup from './homepageFilmGalleryMarkup';
import filmService from './search-section';

function filmPagination() {
  const incrementBtnRef = document.querySelector(
    "button[data-counter='increment']",
  );
  const decrementBtnRef = document.querySelector(
    "button[data-counter='decrement']",
  );
  const valueRef = document.getElementById('value');

  const valueIncrement = (event) => {
    filmService.incrementPage();
    console.log('AFTER - filmService.incrementPage()');
    filmService
      .fetchFilms()
      .then(data => {
        const filmsRef = document.querySelector('.gallery-list');
        filmsRef.innerHTML = '';
        findAndReplaceDamagedImage(data);
        createHomepageFilmGalleryMarkup(data.results);
        valueRef.textContent = filmService.page;
        console.log(
          'pageStatus after Next Button CLICK',
          filmService.pageStatus,
        );

        console.log(data.total_pages);

        if (filmService.pageStatus < data.total_pages) {
          incrementBtnRef.classList.remove('not-visible');
        }
        if (filmService.pageStatus === data.total_pages) {
          incrementBtnRef.classList.add('not-visible');
        }
        if (filmService.pageStatus > 1) {
          decrementBtnRef.classList.remove('not-visible');
        }
      })
      .catch(error => console.log(error));
  };

  const valueDecrement = () => {
    filmService.decrementPage();
    filmService
      .fetchFilms()
      .then(data => {
        const filmsRef = document.querySelector('.gallery-list');
        filmsRef.innerHTML = '';
        findAndReplaceDamagedImage(data);
        createHomepageFilmGalleryMarkup(data.results);
        valueRef.textContent = filmService.page;
        console.log('page status after Prev Button CLICK', filmService.page);
        console.log(data.total_pages);

        console.log(data.total_pages);

        if (filmService.pageStatus === 1) {
          incrementBtnRef.classList.remove('visible');
          decrementBtnRef.classList.add('not-visible');
        }

        if (filmService.pageStatus < data.total_pages) {
          incrementBtnRef.classList.add('visible');
          incrementBtnRef.classList.remove('not-visible');
        }
      })
      .catch(error => console.log(error));
  };

  incrementBtnRef.addEventListener('click', valueIncrement);

  decrementBtnRef.addEventListener('click', valueDecrement);
}

export default filmPagination;
