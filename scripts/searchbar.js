

export function renderSearchBar () {

  let searchValue = getUrlSearch();

  let html = `
    <input class="search-bar" id="js-search-bar" type="text" placeholder="Search" ${searchValue ? `value='${searchValue}'` : '' }>

    <button class="search-button">
      <img class="search-icon js-search-icon" src="images/icons/search-icon.png">
    </button>
  `
  document.querySelector('.amazon-header-middle-section').innerHTML = html;

  document.querySelector('.js-search-icon').addEventListener('click', () => {
    searchValue = document.getElementById('js-search-bar').value;
    window.location.href = `amazon.html?search=${searchValue}`;
    //window.open(`amazon.html?search=${searchValue}`, '_self')

  })
  
  document.getElementById('js-search-bar').addEventListener('keyup', (event) => {
    if ('Enter' === event.key) {
      document.querySelector('.js-search-icon').click();
    }
  })

}

export function getUrlSearch () {
  const url = new URL(window.location.href);
  let search = url.searchParams.get('search');
  return search;
};

