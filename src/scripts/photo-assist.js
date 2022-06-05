import axios from "axios";

export default class PhotoApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchArticles() {
        const options = {
            params: {
                key: '27848498-36175e3910a91ccb36527cf64',
                q: this.searchQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 40,
                page: this.page,
            },
        };

    
        const response = await axios.get('https://pixabay.com/api/', options);
        const data = await response.data;
        this.incrementPage();
        return data;
    };
        

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}