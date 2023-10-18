import { LightningElement, api, wire } from 'lwc';
import getMovieTrailerForBooking from '@salesforce/apex/fsGetMovie.getMovieTrailerForBooking';

export default class FsShowTrailer extends LightningElement {
    @api movieId;
    movieTrailerURL;

    @wire(getMovieTrailerForBooking, { currentMovieId: '$movieId' })
    wiredMovie({ error, data }) {
        if (data) {
            this.movieTrailerURL = data[0].Movie_trailer_URL__c;
        } else if (error) {
            console.error(error);
        }
        Consolve.log({movieId})
    }
}
