export default function markupPhoto(data) {
    return data
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
    <a class="gallery__item" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}"  />
        </a>
        <div class="data">
        <p class="data-item">
            <b class="name-data">Likes:<span class="data"> ${likes}<span></b>
        </p>
        <p class="data-item">
            <b class="name-data">Views:<span class="data"> ${views}<span></b>
        </p>
        <p class="data-item">
            <b class="name-data">Comments:<span class="data"> ${comments}<span></b>
        </p>
        <p class="data-item">
            <b class="name-data">Downloads:<span class="data"> ${downloads}<span></b>
        </p>
        </div>
    </div>`;
    }).join('');
}