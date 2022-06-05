
import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";
import PhotoApiService from './scripts/photo-assist';
import markupPhoto from './scripts/markup';

const refs = {
    serchForm: document.querySelector('.search-form'),
    loadMoreButton: document.querySelector('#load-more'),
    advCont: document.querySelector('.gallery'),
}

const photoApiService = new PhotoApiService();

refs.loadMoreButton.classList.add('display-none');
refs.advCont.innerHTML = startPage();

refs.serchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLOadMore)

const lightboxOpt = {
    captions: true,
    captionDelay: 300,
    captionsData: "alt",
};

const galLightBox = new SimpleLightbox('.gallery a', lightboxOpt);

function onSearch(e) {
    e.preventDefault();

    photoApiService.query = e.currentTarget.elements.searchQuery.value;

    if (!photoApiService.query) {
        return onError();
    }

    photoApiService.resetPage()
    refs.advCont.innerHTML = '';
    photoApiService.fetchArticles().then(data => {

        if (data.totalHits !== 0 && data.hits.length === 0) {
            return Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
        }
        refs.advCont.insertAdjacentHTML('beforeend', markupPhoto(data.hits));

        refs.loadMoreButton.classList.remove('display-none');

        galLightBox.refresh();

        if (data.totalHits > 0 && photoApiService.page === 2) {
            Notiflix.Notify.success(`Ура! Ми виявили ${data.totalHits} зображення.`);
        }

        if (photoApiService.page > 2) {
            const { height: cardHeight } = document
            .querySelector('.gallery')
            .firstElementChild.getBoundingClientRect();

            window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
            });
        }

        if (data.hits.length === 0) {
            return onError();
        }
            return console.log(data);
            return data;
    });
    
}

function onLOadMore() {
    photoApiService.fetchArticles().then(data => {
        if (data.totalHits !== 0 && data.hits.length === 0) {
            refs.loadMoreButton.classList.add('display-none');
            return Notiflix.Notify.warning(`Вибачте, але ви досягли кінця результатів пошуку.`);
        }
        refs.advCont.insertAdjacentHTML('beforeend', markupPhoto(data.hits));
        }
    );
}

function onError() {
    refs.loadMoreButton.classList.add('display-none');
    return Notiflix.Notify.failure('На жаль, немає зображень, які відповідають вашому пошуковому запиту. Будь ласка спробуйте ще раз');
};

function startPage() {
    return '<h2 class="start"> Давайте почнемо шукати!</h2>'
}