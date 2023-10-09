import { LightningElement, api } from 'lwc';

export default class fsListMovieItem extends LightningElement {
    @api movie;

    get movieImageUrl() {
        return this.movie.Movie_img_Url;
    }

    get moviePremiere() {
        return this.movie.Premiere_date;
    }

    get movieTitle() {
        return this.movie.Title;
    }

    get movieDuration() {
        return this.movie.Duration;
    }

    get movieGenre() {
        return this.movie.Genre;
    }
}