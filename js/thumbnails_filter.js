const imgFilters = document.querySelector('.img-filters');

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const maxRandomThumbnails = 10;

const SortThumbnails = {
  DEFAULT: (array) => array.sort((first, last) => first.id - last.id),
  RANDOM: (array) => array.sort(() => Math.random() - 0.5).slice(0, maxRandomThumbnails),
  DISCUSSED: (array) => array.sort((first, last) => last.comments.length - first.comments.length),
};

// функция установки активного фильтра
const setFilter = (evt) => {
  const activeFilter = imgFilters.querySelector('.img-filters__button--active');
  activeFilter.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};


const setFilterDefault = (cb, data) => {
  filterDefault.addEventListener('click', (evt) => {
    setFilter(evt);
    cb(SortThumbnails.DEFAULT(data));
  });
};

const setFilterRandom = (cb, data) => {
  filterRandom.addEventListener('click', (evt) => {
    setFilter(evt);
    cb(SortThumbnails.RANDOM(data));
  });
};

const setfilterDiscussed = (cb, data) => {
  filterDiscussed.addEventListener('click', (evt) => {
    setFilter(evt);
    cb(SortThumbnails.DISCUSSED(data));
  });
};


export { setFilterDefault, setFilterRandom, setfilterDiscussed };

